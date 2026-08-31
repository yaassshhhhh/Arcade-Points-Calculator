const https = require('https');
const fs = require('fs');
const path = require('path');

const fetchBadges = (page) => {
  return new Promise((resolve, reject) => {
    https.get(`https://www.skills.google/catalog/list?format%5B%5D=__any__&keywords=&locale=&skill-badge%5B%5D=skill-badge&page=${page}`, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch(e) {
          reject(e);
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
};

async function fetchAllBadges() {
  let allBadges = [];
  let page = 1;
  let hasMore = true;

  console.log('Starting badge fetch...');

  while (hasMore) {
    try {
      console.log(`Fetching page ${page}...`);
      const badges = await fetchBadges(page);
      if (badges && badges.length > 0) {
        // Filter out the duplicate badge
        const filteredBadges = badges.filter(b => b.title !== "Get Started with Sensitive Data Protection");
        allBadges = allBadges.concat(filteredBadges);
        page++;
      } else {
        hasMore = false;
      }
    } catch (e) {
      console.error(`Error on page ${page}:`, e);
      hasMore = false;
    }
  }

  console.log(`Total badges fetched from API: ${allBadges.length}`);
  
  // Add new missing badges manually if not already present
  const extraBadges = [
    {
      "type": "course",
      "title": "Use Agent Skills with Multi-Agent Systems",
      "description": "Complete the advanced Use Agent Skills with Multi-Agent Systems skill badge course to demonstrate skills in building multi-agent systems with ADK, connecting agents with the Agent-to-Agent (A2A) protocol, integrating external tools using the Model Context Protocol (MCP), and deploying a complete multi-agent solution to Agent Engine.",
      "path": "/course_templates/1842",
      "duration": "",
      "level": "advanced",
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
      "title": "Design and Implement Network Security in Google Cloud",
      "description": "Complete the intermediate Design and Implement Network Security in Google Cloud skill badge course to demonstrate skills in the following: Isolate a compromised VM via firewall rules and establish secure bastion access. Migrate tagged and untagged VPC firewall rules to a global network firewall policy. Troubleshoot outbound DNS resolution for a Google Compute Engine instance due to a misconfigured Cloud NAT.",
      "path": "/course_templates/1736",
      "duration": "",
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

  for (const extra of extraBadges) {
    if (!allBadges.some(b => b.title === extra.title)) {
      allBadges.push(extra);
    }
  }

  console.log(`Total badges after adding missing ones: ${allBadges.length}`);
  
  const dataDir = path.join(__dirname, 'public', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const outputPath = path.join(dataDir, 'skill-badges.json');
  fs.writeFileSync(outputPath, JSON.stringify(allBadges, null, 2));
  console.log(`Saved to ${outputPath}`);
}

fetchAllBadges();
