import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { calculateScore, checkMilestones, checkFacilitatorMilestones, classifyBadge } from '../../../lib/arcadePoints';
import { updateLeaderboard } from '../../../lib/leaderboardStore';
// Simple in-memory cache to prevent hammering Google's servers
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

export async function POST(req) {
  try {
    const { url } = await req.json();

    // 1. Validation
    if (!url || (!url.includes('cloudskillsboost.google/public_profiles/') && !url.includes('skills.google/public_profiles/'))) {
      return NextResponse.json({ error: 'Please provide a valid Google Cloud Skills Boost public profile URL.' }, { status: 400 });
    }

    // Ensure URL has https://
    let formattedUrl = url;
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
    }

    // 2. Check Cache
    const cachedResult = cache.get(url);
    if (cachedResult && (Date.now() - cachedResult.timestamp < CACHE_TTL)) {
      return NextResponse.json({ success: true, data: cachedResult.data });
    }

    // 3. Fetching with Timeout
    const fetchController = new AbortController();
    const timeoutId = setTimeout(() => fetchController.abort(), 10000); // 10s timeout

    let response;
    try {
      response = await fetch(formattedUrl, { signal: fetchController.signal });
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

    if (badges.length === 0) {
      return NextResponse.json({ error: 'No badges found on this profile. Verify the profile has completed activities.' }, { status: 404 });
    }

    // 5. Logic Integration
    const { counts, totalPoints, workMeetsPlayBonus } = calculateScore(badges);
    const milestonesInfo = checkFacilitatorMilestones(badges);

    const data = {
      userName,
      totalPoints,
      badgeCount: badges.length,
      counts,
      milestones: milestonesInfo,
      workMeetsPlayBonus,
      badges
    };

    // 6. Caching & Leaderboard
    cache.set(url, { data, timestamp: Date.now() });
    
    // Asynchronously update the leaderboard (fire and forget to not delay response)
    Promise.resolve().then(() => updateLeaderboard({
      userName,
      points: totalPoints,
      badgeCount: badges.length,
      url: url // Keep the url just in case
    })).catch(err => console.error("Leaderboard update failed:", err));

    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error('Error in calculate API:', error);
    return NextResponse.json({ error: 'An unexpected error occurred while processing the profile.' }, { status: 500 });
  }
}
