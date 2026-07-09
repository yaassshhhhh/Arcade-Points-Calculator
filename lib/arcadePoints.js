import keywords from '../config/keywords.json';
import milestones from '../config/milestones.json';
import skillBadgesData from '../public/data/skill-badges.json';

const knownSkillBadges = new Set();
skillBadgesData.forEach(b => {
  if (b.title) {
    knownSkillBadges.add(b.title.toLowerCase().trim());
  }
});

/**
 * Classifies a badge based on its name and the keyword mappings.
 */
export function classifyBadge(badgeName) {
  const lowerName = badgeName.toLowerCase().trim();

  // Completion badges have 0 points, so classify them as 'completionBadge' immediately
  if (lowerName.includes("completion")) {
    return 'completionBadge';
  }

  const normalizedName = lowerName.replace(/\s*skill badge\s*$/i, "").trim();
  
  if (knownSkillBadges.has(normalizedName) || knownSkillBadges.has(lowerName) || lowerName.includes("skill badge")) {
    return 'skillBadge';
  }
  
  for (const [category, words] of Object.entries(keywords)) {
    if (category === 'skillBadge') continue; // Prevent loose keywords from falsely matching course completion badges
    for (const word of words) {
      if (lowerName.includes(word.toLowerCase())) {
        return category;
      }
    }
  }
  
  return 'completionBadge';
}

/**
 * Calculates the total score and categorization counts for an array of badges.
 */
export function calculateScore(badges) {
  const counts = {
    game: 0,
    skillBadge: 0,
    labFree: 0,
    special: 0,
    specialGame: 0,
    specialGame3: 0,
    workMeetsPlay: 0,
    completionBadge: 0
  };

  badges.forEach(badge => {
    const category = classifyBadge(badge.name);
    counts[category]++;
  });

  // Calculate points
  // 1 point per game, special
  // 2 points per specialGame (e.g. Work-Life Refresh)
  // 0.5 points per skill badge
  // 0 points for lab-free and completionBadge
  const points = {
    game: counts.game * 1,
    special: counts.special * 1,
    specialGame: counts.specialGame * 2,
    specialGame3: counts.specialGame3 * 3,
    workMeetsPlay: 0,
    skillBadge: counts.skillBadge * 0.5
  };

  let totalPoints = points.game + points.special + points.specialGame + points.specialGame3 + points.workMeetsPlay + points.skillBadge;
  
  let workMeetsPlayBonus = false;
  if (counts.workMeetsPlay >= 6) {
    totalPoints += 7;
    workMeetsPlayBonus = true;
  }

  return { counts, points, totalPoints, workMeetsPlayBonus };
}

/**
 * Checks milestone progress against the required thresholds.
 */
export function checkMilestones(counts) {
  const achieved = [];
  let next = null;

  // Assuming milestones are sorted in ascending order of requirements in config
  for (const milestone of milestones) {
    if (counts.game >= milestone.gamesRequired && counts.skillBadge >= milestone.skillBadgesRequired) {
      achieved.push(milestone);
    } else {
      next = {
        ...milestone,
        gamesNeeded: Math.max(0, milestone.gamesRequired - counts.game),
        skillBadgesNeeded: Math.max(0, milestone.skillBadgesRequired - counts.skillBadge)
      };
      break; // Found the next unachieved milestone
    }
  }

  return { achieved, next };
}

/**
 * Checks facilitator milestones by only counting badges earned after the cutoff date.
 * Cutoff: July 13, 2026 at 5:00 PM IST (UTC: 2026-07-13T11:30:00Z)
 */
export function checkFacilitatorMilestones(badges) {
  const CUTOFF_TIMESTAMP = Date.parse("2026-07-13T11:30:00Z");

  const validCounts = {
    game: 0,
    skillBadge: 0,
    labFree: 0,
    special: 0,
    specialGame: 0,
    specialGame3: 0,
    workMeetsPlay: 0,
    completionBadge: 0
  };

  badges.forEach(badge => {
    // Parse "Earned Jul 13, 2026 EDT" or similar by removing "Earned "
    const cleanDateStr = badge.earnedDate.replace(/^Earned\s+/i, "").trim();
    const earnedTimestamp = Date.parse(cleanDateStr);

    // If date is valid and after cutoff, count it
    if (!isNaN(earnedTimestamp) && earnedTimestamp >= CUTOFF_TIMESTAMP) {
      const category = classifyBadge(badge.name);
      validCounts[category]++;
    }
  });

  return checkMilestones(validCounts);
}
