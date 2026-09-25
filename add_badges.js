const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'public', 'data', 'skill-badges.json');

const badgesToAdd = [
  {
    "type": "course",
    "title": "Google Cloud Database Migrations: Homogeneous",
    "description": "Orchestrate the complete execution of a homogeneous database migration to Google Cloud. In this course, you will see how to use the Database Migration Service (DMS) for live replication and the Data Validation Tool (DVT) to certify data integrity. You will learn the engine specific steps for preparing sources like PostgreSQL and SQL Server for a move to an equivalent managed target such as AlloyDB and Cloud SQL. You will leave ready to oversee a seamless, validated migration, ensuring a fast, reliable, and low risk transition to a managed Google Cloud database.",
    "path": "https://www.skills.google/public_profiles/2762ddf6-1ab3-4612-9a52-ce2aac3d63ad/badges/27979953",
    "duration": "45 minutes",
    "level": "intermediate",
    "credentialType": "skill_badge",
    "progress": null,
    "required": null,
    "dueDate": null,
    "paid": null,
    "overdue": null,
    "locked": null,
    "lockedMessage": null,
    "inactiveLinks": null,
    "removeHref": null
  },
  {
    "type": "course",
    "title": "Google Cloud Database Migrations: Strategy",
    "description": "Ready to move your databases to Google Cloud? This course provides the strategy. Learn to evaluate business drivers to overcome high on-premise costs and vendor lock-in. Use Migration Center to discover assets, analyze TCO, and build a phased wave plan. You’ll learn to choose the right migration path and identify the right Google Cloud solutions for your workloads. You'll leave with a data-driven business case and a clear roadmap, ready to win executive buy-in and lead a successful migration.",
    "path": "https://www.skills.google/public_profiles/2762ddf6-1ab3-4612-9a52-ce2aac3d63ad/badges/27979226",
    "duration": "45 minutes",
    "level": "intermediate",
    "credentialType": "skill_badge",
    "progress": null,
    "required": null,
    "dueDate": null,
    "paid": null,
    "overdue": null,
    "locked": null,
    "lockedMessage": null,
    "inactiveLinks": null,
    "removeHref": null
  }
];

let existingBadges = [];
if (fs.existsSync(jsonPath)) {
  existingBadges = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
}

// Ensure we don't add duplicates
const existingTitles = new Set(existingBadges.map(b => b.title));

let addedCount = 0;
badgesToAdd.forEach(b => {
  if (!existingTitles.has(b.title)) {
    existingBadges.unshift(b); // Add to the top of the list
    addedCount++;
  }
});

fs.writeFileSync(jsonPath, JSON.stringify(existingBadges, null, 2));

console.log(`Successfully added ${addedCount} badges. Total is now ${existingBadges.length}.`);
