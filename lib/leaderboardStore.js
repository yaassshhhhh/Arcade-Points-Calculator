import fs from 'fs';
import path from 'path';

// Define the path to the leaderboard JSON file
const LEADERBOARD_FILE_PATH = path.join(process.cwd(), 'data', 'leaderboard.json');

/**
 * Ensures that the data directory and the leaderboard JSON file exist.
 * If not, it creates them.
 */
function ensureFileExists() {
  const dir = path.dirname(LEADERBOARD_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(LEADERBOARD_FILE_PATH)) {
    fs.writeFileSync(LEADERBOARD_FILE_PATH, JSON.stringify([]), 'utf-8');
  }
}

/**
 * Retrieves the current leaderboard.
 * @returns {Array} List of leaderboard entries.
 */
export function getLeaderboard() {
  try {
    ensureFileExists();
    const data = fs.readFileSync(LEADERBOARD_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading leaderboard file:', error);
    return [];
  }
}

/**
 * Adds or updates a user in the leaderboard.
 * @param {Object} user - The user object containing at least { userName, points, badgeCount, url }.
 */
export function updateLeaderboard(user) {
  try {
    const leaderboard = getLeaderboard();
    
    const existingIndex = leaderboard.findIndex(u => u.userName === user.userName);
    
    if (existingIndex !== -1) {
      // Update existing user if they have a higher score
      if (user.points > leaderboard[existingIndex].points) {
        leaderboard[existingIndex] = {
          ...leaderboard[existingIndex],
          points: user.points,
          badgeCount: user.badgeCount,
          lastUpdated: Date.now()
        };
      }
    } else {
      // Add new user
      leaderboard.push({
        userName: user.userName,
        points: user.points,
        badgeCount: user.badgeCount,
        lastUpdated: Date.now()
      });
    }

    // Sort leaderboard by points descending
    leaderboard.sort((a, b) => b.points - a.points);
    
    fs.writeFileSync(LEADERBOARD_FILE_PATH, JSON.stringify(leaderboard, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error updating leaderboard file:', error);
  }
}
