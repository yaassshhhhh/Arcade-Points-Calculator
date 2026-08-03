import { classifyBadge, calculateScore } from './lib/arcadePoints.js';

const newGames = [
  "Arcade Base Camp August 2026",
  "Arcade Adventure",
  "Arcade Voyage: Google Sheets",
  "Arcade Trail: Cloud Delivery Systems",
  "Spans and Plans",
  "Arcade Simulator: Network Security Engineer"
];

const badges = newGames.map(name => ({ name, earnedDate: "Earned Aug 03, 2026 EDT" }));
const result = calculateScore(badges);

console.log("Classifications:");
badges.forEach(b => console.log(b.name, "->", classifyBadge(b.name)));
console.log("Total Points:", result.totalPoints);
