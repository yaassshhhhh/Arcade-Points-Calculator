import { calculateScore } from './lib/arcadePoints.js';
const badges = Array(15).fill({ name: "skill badge level 1" });
console.log(calculateScore(badges));
