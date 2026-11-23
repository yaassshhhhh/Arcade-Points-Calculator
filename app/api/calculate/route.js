import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { calculateScore, checkMilestones, checkFacilitatorMilestones, classifyBadge } from '../../../lib/arcadePoints';
import { updateLeaderboard } from '../../../lib/leaderboardStore';
import skillBadgesData from '../../../public/data/skill-badges.json';
// High-performance in-memory cache to prevent hammering Google's servers & deliver instant responses
const cache = new Map();
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes in milliseconds

function extractProfileKey(rawUrl) {
  if (!rawUrl) return '';
  const match = rawUrl.match(/public_profiles\/([a-zA-Z0-9_-]+)/i);
  return match ? match[1].toLowerCase() : rawUrl.toLowerCase().trim();
}

export async function POST(req) {
  try {
    let { url } = await req.json();

    if (url && url.includes('|||')) {
      url = url.split('|||')[0];
    } else if (url && url.includes('||')) {
      url = url.split('||')[0];
    }

    url = (url || '').trim();

    // 1. Validation
    if (!url || (!url.includes('cloudskillsboost.google/public_profiles/') && !url.includes('skills.google/public_profiles/'))) {
      return NextResponse.json({ error: 'Please provide a valid Google Cloud Skills Boost public profile URL.' }, { status: 400 });
    }

    // Ensure URL has https://
    let formattedUrl = url;
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
    }

    // 2. Check Instant Cache
    const profileKey = extractProfileKey(formattedUrl);
    const cachedResult = cache.get(profileKey) || cache.get(url) || cache.get(formattedUrl);
    if (cachedResult && (Date.now() - cachedResult.timestamp < CACHE_TTL)) {
      return NextResponse.json(
        { success: true, data: cachedResult.data, fromCache: true },
        { headers: { 'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=86400', 'X-Arcade-Cache': 'HIT' } }
      );
    }

    // 3. Fetching with Timeout & Fast Headers
    const fetchController = new AbortController();
    const timeoutId = setTimeout(() => fetchController.abort(), 10000); // 10s timeout

    let response;
    try {
      response = await fetch(formattedUrl, {
        signal: fetchController.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'Cache-Control': 'no-cache'
        }
      });
      clearTimeout(timeoutId);
    } catch (err) {
      if (err.name === 'AbortError') {
        return NextResponse.json({ error: 'Connection timeout. The Google servers took too long to respond.' }, { status: 504 });
      }
      throw err;
    }

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: 'Profile not found. Ensure the URL is correct and the profile is public.' }, { status: 404 });
      }
      return NextResponse.json({ error: 'Failed to fetch the profile from Google. Please try again later.' }, { status: 400 });
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Profile structure validation — support both cloudskillsboost.google (ql-headline-1)
    // and skills.google (ql-display-small) DOM structures
    const userName =
      $('h1.ql-headline-1').text().trim() ||
      $('h1.ql-display-small').text().trim() ||
      $('h1').first().text().trim();

    if (!userName) {
       return NextResponse.json({ error: 'Failed to parse profile. The page structure may have changed.' }, { status: 500 });
    }

    // Attempt to parse avatar
    let userAvatar = $('.ql-avatar img').attr('src') || $('.profile-avatar img').attr('src') || $('img.avatar').attr('src') || $('ql-avatar').attr('src') || $('meta[property="og:image"]').attr('content') || null;
    
    if (userAvatar) {
      if (userAvatar.startsWith('//')) {
        userAvatar = 'https:' + userAvatar;
      } else if (userAvatar.startsWith('/')) {
         try {
           const urlObj = new URL(formattedUrl);
           userAvatar = `${urlObj.origin}${userAvatar}`;
         } catch (e) {
           // Ignore URL parsing errors
         }
      }
    }

    // 4. Parsing Badges — works for both domain structures
    const badges = [];
    $('.profile-badge').each((i, el) => {
      // Badge name is in .ql-title-medium span on both domains
      const name = $(el).find('.ql-title-medium').text().trim() || $(el).find('span').first().text().trim();
      // Earned date is in .ql-body-medium span on both domains
      const earnedDate = $(el).find('.ql-body-medium').text().trim() || 'Unknown date';
      // On skills.google, image is inside .badge-image anchor; on cloudskillsboost it's direct
      const imageSrc = $(el).find('.badge-image img').attr('src') || $(el).find('img').attr('src') || '';
      
      if (name) {
        badges.push({ name, earnedDate, imageSrc, category: classifyBadge(name) });
      }
    });

    // Filter out badges earned before Jan 5, 2026
    const GLOBAL_CUTOFF_TIMESTAMP = Date.parse("2026-01-05T00:00:00Z");
    const validBadges = badges.filter(badge => {
      const cleanDateStr = badge.earnedDate.replace(/^Earned\s+/i, "").trim();
      const earnedTimestamp = Date.parse(cleanDateStr);
      // Count if valid date and >= Jan 5 2026. If date is totally invalid, skip it.
      return !isNaN(earnedTimestamp) && earnedTimestamp >= GLOBAL_CUTOFF_TIMESTAMP;
    });

    if (validBadges.length === 0) {
      return NextResponse.json({ error: 'No eligible badges found after Jan 5, 2026.' }, { status: 404 });
    }

    // 5. Logic Integration
    const { counts, totalPoints: basePoints, workMeetsPlayBonus } = calculateScore(validBadges);
    const milestonesInfo = checkFacilitatorMilestones(validBadges);

    let facilitatorBonus = 0;
    if (milestonesInfo && milestonesInfo.achieved && milestonesInfo.achieved.length > 0) {
      const highestAchieved = milestonesInfo.achieved[milestonesInfo.achieved.length - 1];
      if (highestAchieved.bonusPoints) {
        facilitatorBonus = highestAchieved.bonusPoints;
      }
    }

    const finalTotalPoints = basePoints + facilitatorBonus;

    const data = {
      userName,
      userAvatar,
      basePoints,
      facilitatorBonus,
      totalPoints: finalTotalPoints,
      badgeCount: validBadges.length,
      counts,
      milestones: milestonesInfo,
      workMeetsPlayBonus,
      badges: validBadges,
      totalSkillBadges: skillBadgesData.length
    };

    // 5.5 Facilitator mapping (After July 13, 2026)
    const facilitatorCutoff = new Date("2026-07-13T00:00:00Z");
    let facilitatorCode = null;
    let facilitatorName = null;
    
    if (Date.now() >= facilitatorCutoff.getTime()) {
      try {
        const participantMapping = JSON.parse(process.env.PARTICIPANT_MAPPING || '{}');
        const facilitatorsData = JSON.parse(process.env.FACILITATORS_DATA || '{}');
        
        // Find if this URL is mapped to a referral code
        const refCode = participantMapping[formattedUrl] || participantMapping[url];
        
        if (refCode && facilitatorsData[refCode]) {
          facilitatorCode = refCode;
          // Join the team member names as the facilitator name
          facilitatorName = facilitatorsData[refCode].join(' & ');
          
          // Attach to data for dashboard display
          data.facilitatorDetails = {
            code: facilitatorCode,
            name: facilitatorName
          };
        }
      } catch (err) {
        console.error("Error parsing facilitator data from env:", err);
      }
    }

    // 6. Caching & Leaderboard
    const cacheEntry = { data, timestamp: Date.now() };
    cache.set(profileKey, cacheEntry);
    cache.set(url, cacheEntry);
    cache.set(formattedUrl, cacheEntry);

    // Update leaderboard asynchronously in background without delaying HTTP response to user
    updateLeaderboard({
      userName,
      points: finalTotalPoints,
      badgeCount: validBadges.length,
      url: url,
      userAvatar: userAvatar,
      facilitatorCode: facilitatorCode,
      facilitatorName: facilitatorName
    }).catch((err) => {
      console.error("Leaderboard background update failed:", err);
    });

    return NextResponse.json(
      { success: true, data },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=86400',
          'X-Arcade-Cache': 'MISS'
        }
      }
    );

  } catch (error) {
    console.error('Error in calculate API:', error);
    return NextResponse.json({ error: 'An unexpected error occurred while processing the profile.' }, { status: 500 });
  }
}
