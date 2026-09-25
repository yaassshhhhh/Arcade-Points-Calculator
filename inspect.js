const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('https://www.skills.google/public_profiles/2762ddf6-1ab3-4612-9a52-ce2aac3d63ad', { waitUntil: 'networkidle2' });
  
  const badges = await page.evaluate(() => {
    const badgeElements = Array.from(document.querySelectorAll('.profile-badge')).slice(0, 5);
    return badgeElements.map(el => {
      return {
        html: el.innerHTML
      };
    });
  });
  
  console.log(JSON.stringify(badges, null, 2));
  await browser.close();
})();
