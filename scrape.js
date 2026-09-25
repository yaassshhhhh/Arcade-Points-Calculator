const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Set viewport to trigger lazy loading
  await page.setViewport({ width: 1200, height: 800 });
  
  console.log('Navigating to profile...');
  await page.goto('https://www.skills.google/public_profiles/2762ddf6-1ab3-4612-9a52-ce2aac3d63ad', { waitUntil: 'networkidle2' });
  
  console.log('Scrolling to load all badges...');
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      let totalHeight = 0;
      let distance = 500;
      let scrolls = 0;
      let timer = setInterval(() => {
        let scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        scrolls++;
        
        // Sometimes skills.google has a specific scrolling container, try scrolling that too
        const container = document.querySelector('.profile-badges') || document.querySelector('main') || document.querySelector('.body-content');
        if (container) {
          container.scrollBy(0, distance);
        }

        if (scrolls >= 60 || totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 300);
    });
  });
  
  // Wait a bit more for images and final items to load
  await new Promise(r => setTimeout(r, 3000));
  
  console.log('Extracting badges...');
  const badges = await page.evaluate(() => {
    const badgeElements = document.querySelectorAll('.profile-badge');
    const results = [];
    
    badgeElements.forEach(el => {
      const nameEl = el.querySelector('.ql-title-medium') || el.querySelector('span');
      const name = nameEl ? nameEl.innerText.trim() : '';
      
      const linkEl = el.querySelector('a');
      const path = linkEl ? linkEl.getAttribute('href') : '';
      
      if (name && path) {
        // If it's a full URL, keep it, else prepend domain
        const fullPath = path.startsWith('http') ? path : (path.startsWith('/') ? path : '/' + path);
        results.push({
          type: "course",
          title: name,
          description: "Earned badge: " + name, // generic description since actual desc is in modal
          path: fullPath,
          duration: "N/A",
          level: "intermediate",
          credentialType: "skill_badge",
          progress: null,
          required: null,
          dueDate: null,
          paid: null,
          overdue: null,
          locked: null,
          lockedMessage: null,
          inactiveLinks: null,
          removeHref: null
        });
      }
    });
    return results;
  });
  
  console.log(`Found ${badges.length} badges.`);
  
  // Save to file
  const jsonPath = 'public/data/skill-badges.json';
  let existingBadges = [];
  try {
    if (fs.existsSync(jsonPath)) {
      existingBadges = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    }
  } catch (e) {
    console.log('Could not read existing badges:', e);
  }
  
  // Merge, avoiding duplicates by title
  const newBadgesMap = new Map();
  existingBadges.forEach(b => newBadgesMap.set(b.title, b));
  badges.forEach(b => {
    if (!newBadgesMap.has(b.title)) {
      newBadgesMap.set(b.title, b);
    }
  });
  
  const finalBadges = Array.from(newBadgesMap.values());
  fs.writeFileSync(jsonPath, JSON.stringify(finalBadges, null, 2));
  
  console.log(`Saved ${finalBadges.length} total badges to ${jsonPath}`);
  
  await browser.close();
})();
