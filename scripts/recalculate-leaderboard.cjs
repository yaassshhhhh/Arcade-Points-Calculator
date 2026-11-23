const cheerio = require('cheerio');
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const env = fs.readFileSync('.env.local', 'utf8');
const envVars = {};
env.split('\n').forEach(line => {
  const [k, ...v] = line.split('=');
  if (k && v) envVars[k.trim()] = v.join('=').trim().replace(/(^[\"'])|([\"']$)/g, '');
});

const sb = createClient(envVars.NEXT_PUBLIC_SUPABASE_URL, envVars.SUPABASE_SERVICE_ROLE_KEY);

const keywords = JSON.parse(fs.readFileSync('./config/keywords.json', 'utf8'));
const milestones = JSON.parse(fs.readFileSync('./config/milestones.json', 'utf8'));
const skillBadgesData = JSON.parse(fs.readFileSync('./public/data/skill-badges.json', 'utf8'));

const knownSkillBadges = new Set();
skillBadgesData.forEach(b => {
  if (b.title) knownSkillBadges.add(b.title.toLowerCase().trim());
});

function classifyBadge(badgeName) {
  const lowerName = badgeName.toLowerCase().trim();
  if (lowerName.includes("completion")) return 'completionBadge';
  const normalizedName = lowerName.replace(/\s*skill badge\s*$/i, "").trim();
  if (knownSkillBadges.has(normalizedName) || knownSkillBadges.has(lowerName) || lowerName.includes("skill badge")) {
    return 'skillBadge';
  }
  for (const [category, words] of Object.entries(keywords)) {
    if (category === 'skillBadge') continue;
    for (const word of words) {
      if (lowerName.includes(word.toLowerCase())) return category;
    }
  }
  return 'completionBadge';
}

function calculateScore(badges) {
  const counts = { game: 0, skillBadge: 0, labFree: 0, special: 0, specialGame: 0, specialGame3: 0, workMeetsPlay: 0, completionBadge: 0 };
  badges.forEach(badge => counts[classifyBadge(badge.name)]++);
  const points = {
    game: counts.game * 1,
    special: counts.special * 1,
    specialGame: counts.specialGame * 2,
    specialGame3: counts.specialGame3 * 3,
    workMeetsPlay: 0,
    skillBadge: counts.skillBadge * 0.5
  };
  let totalPoints = points.game + points.special + points.specialGame + points.specialGame3 + points.workMeetsPlay + points.skillBadge;
  if (counts.workMeetsPlay >= 6) totalPoints += 7;
  return { counts, points, totalPoints };
}

function checkMilestones(counts) {
  const achieved = [];
  const totalGamesForMilestone = counts.game + (counts.specialGame || 0) + (counts.specialGame3 || 0);
  for (const milestone of milestones) {
    if (totalGamesForMilestone >= milestone.gamesRequired && counts.skillBadge >= milestone.skillBadgesRequired) {
      achieved.push(milestone);
    }
  }
  return { achieved };
}

function checkFacilitatorMilestones(badges) {
  const CUTOFF_TIMESTAMP = Date.parse("2026-07-13T00:00:00Z");
  const validCounts = { game: 0, skillBadge: 0, labFree: 0, special: 0, specialGame: 0, specialGame3: 0, workMeetsPlay: 0, completionBadge: 0 };
  badges.forEach(badge => {
    const cleanDateStr = badge.earnedDate.replace(/^Earned\s+/i, "").trim();
    const earnedTimestamp = Date.parse(cleanDateStr);
    if (!isNaN(earnedTimestamp) && earnedTimestamp >= CUTOFF_TIMESTAMP) {
      const category = classifyBadge(badge.name);
      validCounts[category]++;
    }
  });
  return checkMilestones(validCounts);
}

async function scrapeProfile(rawUrl) {
  let url = rawUrl;
  if (url.includes('|||')) url = url.split('|||')[0];
  if (url.includes('||')) url = url.split('||')[0];
  if (!url.startsWith('http')) url = 'https://' + url;

  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();
  const $ = cheerio.load(html);

  const badges = [];
  $('.profile-badge').each((i, el) => {
    const name = $(el).find('.ql-title-medium').text().trim() || $(el).find('span').first().text().trim();
    const earnedDate = $(el).find('.ql-body-medium').text().trim() || 'Unknown date';
    if (name) badges.push({ name, earnedDate });
  });

  const GLOBAL_CUTOFF = Date.parse('2026-01-05T00:00:00Z');
  const validBadges = badges.filter(b => {
    const t = Date.parse(b.earnedDate.replace(/^Earned\s+/i, '').trim());
    return !isNaN(t) && t >= GLOBAL_CUTOFF;
  });

  const { totalPoints: basePoints } = calculateScore(validBadges);
  const milestonesInfo = checkFacilitatorMilestones(validBadges);
  let bonusPoints = 0;
  if (milestonesInfo && milestonesInfo.achieved && milestonesInfo.achieved.length > 0) {
    const highest = milestonesInfo.achieved[milestonesInfo.achieved.length - 1];
    if (highest.bonusPoints) bonusPoints = highest.bonusPoints;
  }

  const finalTotalPoints = basePoints + bonusPoints;
  return { basePoints: finalTotalPoints, badgeCount: validBadges.length };
}

async function processInBatches(items, batchSize, fn) {
  const results = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    console.log(`Processing batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(items.length / batchSize)} (${i + 1}..${Math.min(i + batchSize, items.length)} of ${items.length})...`);
    const batchResults = await Promise.all(batch.map(fn));
    results.push(...batchResults);
  }
  return results;
}

async function main() {
  console.log('Fetching all leaderboard rows from Supabase...');
  const { data: rows, error } = await sb.from('leaderboard').select('*');
  if (error) {
    console.error('Failed to fetch leaderboard:', error);
    process.exit(1);
  }

  console.log(`Total rows fetched: ${rows.length}`);

  let updatedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  await processInBatches(rows, 6, async (row) => {
    if (!row.profile_url) {
      console.log(`[SKIP NO URL] ${row.user_name} (points: ${row.points})`);
      skippedCount++;
      return;
    }

    try {
      const { basePoints, badgeCount } = await scrapeProfile(row.profile_url);
      const oldPoints = Number(row.points);

      if (oldPoints !== basePoints || row.badge_count !== badgeCount) {
        const { error: updateError } = await sb
          .from('leaderboard')
          .update({
            points: basePoints,
            badge_count: badgeCount,
            last_updated: new Date().toISOString()
          })
          .eq('user_name', row.user_name);

        if (updateError) {
          console.error(`[UPDATE ERROR] ${row.user_name}:`, updateError.message);
          errorCount++;
        } else {
          console.log(`[CORRECTED] ${row.user_name}: ${oldPoints} pts -> ${basePoints} pts (badges: ${badgeCount})`);
          updatedCount++;
        }
      } else {
        console.log(`[OK UNCHANGED] ${row.user_name}: ${basePoints} pts`);
        skippedCount++;
      }
    } catch (err) {
      console.error(`[SCRAPE FAILED] ${row.user_name} (${row.profile_url}):`, err.message);
      errorCount++;
    }
  });

  console.log('\n--- Summary ---');
  console.log(`Total processed: ${rows.length}`);
  console.log(`Updated: ${updatedCount}`);
  console.log(`Unchanged: ${skippedCount}`);
  console.log(`Errors/Failed: ${errorCount}`);
}

main();
