const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('https://www.skills.google/public_profiles/2762ddf6-1ab3-4612-9a52-ce2aac3d63ad', { waitUntil: 'networkidle2' });
  
  // Wait a little bit for page to load completely
  await new Promise(r => setTimeout(r, 2000));
  
  const modals = await page.evaluate(() => {
    const modalElements = Array.from(document.querySelectorAll('.profile-award-modal')).slice(0, 5);
    return modalElements.map(el => {
      return el.innerText;
    });
  });
  
  console.log(JSON.stringify(modals, null, 2));
  await browser.close();
})();
