const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'public', 'data', 'skill-badges.json');

if (fs.existsSync(jsonPath)) {
  const existingBadges = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  let updated = false;

  for (let i = 0; i < existingBadges.length; i++) {
    if (existingBadges[i].title === "Google Cloud Database Migrations: Strategy") {
      existingBadges[i].path = "/course_templates/1560";
      updated = true;
      break;
    }
  }

  if (updated) {
    fs.writeFileSync(jsonPath, JSON.stringify(existingBadges, null, 2));
    console.log("Successfully updated the URL for 'Google Cloud Database Migrations: Strategy'");
  } else {
    console.log("Badge not found.");
  }
} else {
  console.log("skill-badges.json not found.");
}
