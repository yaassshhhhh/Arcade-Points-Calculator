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
        allBadges = allBadges.concat(badges);
        page++;
      } else {
        hasMore = false;
      }
    } catch (e) {
      console.error(`Error on page ${page}:`, e);
      hasMore = false;
    }
  }

  console.log(`Total badges fetched: ${allBadges.length}`);
  
  const dataDir = path.join(__dirname, 'public', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const outputPath = path.join(dataDir, 'skill-badges.json');
  fs.writeFileSync(outputPath, JSON.stringify(allBadges, null, 2));
  console.log(`Saved to ${outputPath}`);
}

fetchAllBadges();
