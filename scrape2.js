const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1200, height: 800 });
  
  console.log('Navigating to profile...');
  await page.goto('https://www.skills.google/public_profiles/2762ddf6-1ab3-4612-9a52-ce2aac3d63ad', { waitUntil: 'networkidle2' });
  
  console.log('Scrolling to load all badges...');
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      let distance = 500;
      let scrolls = 0;
      let timer = setInterval(() => {
        let scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        scrolls++;
        
        const container = document.querySelector('.profile-badges') || document.querySelector('main');
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
  
  await new Promise(r => setTimeout(r, 2000));
  
  console.log('Extracting badges and their modals...');
  
  const badges = await page.evaluate(() => {
    const badgeElements = document.querySelectorAll('.profile-badge');
    const results = [];
    
    badgeElements.forEach(el => {
      const nameEl = el.querySelector('.ql-title-medium') || el.querySelector('span');
      const name = nameEl ? nameEl.innerText.trim() : '';
      
      const linkEl = el.querySelector('a');
      const path = linkEl ? linkEl.getAttribute('href') : '';
      
      // Look for the modal tied to this badge
      let description = "Earned badge: " + name;
      let isSkillBadge = false;
      const btn = el.querySelector('ql-button[modal]');
      if (btn) {
        const modalId = btn.getAttribute('modal');
        const modalEl = document.getElementById(modalId);
        if (modalEl) {
          description = modalEl.innerText || description;
          description = description.replace(/\n/g, ' ').trim();
        }
      }
      
      // Filter logic: if description contains "skill badge" or title contains "skill badge"
      const lowerDesc = description.toLowerCase();
      const lowerName = name.toLowerCase();
      
      if (lowerDesc.includes("skill badge") || lowerName.includes("skill badge")) {
        isSkillBadge = true;
      }
      
      if (name && path && isSkillBadge) {
        const fullPath = path.startsWith('http') ? path : (path.startsWith('/') ? path : '/' + path);
        results.push({
          type: "course",
          title: name,
          description: description,
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
  
  console.log(`Found ${badges.length} actual skill badges.`);
  
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
