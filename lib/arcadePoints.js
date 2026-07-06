import keywords from '../config/keywords.json';
import milestones from '../config/milestones.json';

/**
 * Classifies a badge based on its name and the keyword mappings.
 */
export function classifyBadge(badgeName) {
  const lowerName = badgeName.toLowerCase();
  
  for (const [category, words] of Object.entries(keywords)) {
    for (const word of words) {
      if (lowerName.includes(word.toLowerCase())) {
        return category;
      }
    }
  }
  
  return 'unknown';
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
    unknown: 0
  };

  badges.forEach(badge => {
    const category = classifyBadge(badge.name);
    counts[category]++;
  });

  // Calculate points
  // 1 point per game, special
  // 2 points per specialGame (e.g. Work-Life Refresh)
  // 0.5 points per skill badge
  // 0 points for lab-free and unknown
  const points = {
    game: counts.game * 1,
    special: counts.special * 1,
    specialGame: counts.specialGame * 2,
    skillBadge: counts.skillBadge * 0.5
  };

  const totalPoints = points.game + points.special + points.specialGame + points.skillBadge;

  return { counts, totalPoints };
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
