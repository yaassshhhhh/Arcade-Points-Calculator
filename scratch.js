const fs = require('fs');

async function fetchBadges() {
  let allBadges = [];
  let page = 1;
  while (true) {
    const res = await fetch(`https://www.skills.google/catalog/list?format%5B%5D=courses&language%5B%5D=en&level%5B%5D=__any__&locale=&skill-badge%5B%5D=completion-badge&page=${page}`, {
      headers: { 'accept': 'application/json' }
    });
    if (!res.ok) break;
    const data = await res.json();
    if (!data || data.length === 0) break;
    allBadges.push(...data);
    page++;
    if (page > 50) break; // safeguard
  }
  
  // Filter out any that might be considered "skill labs" if needed, 
  // but let's just save them all as completion-badges.json
  fs.writeFileSync('public/data/completion-badges.json', JSON.stringify(allBadges, null, 2));
  console.log(`Saved ${allBadges.length} completion badges.`);
}

fetchBadges().catch(console.error);
