const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.click('#mobileMenuBtn');
  await page.waitForTimeout(400);

  await page.screenshot({ path: 'test_mobile_drawer.png' });
  await browser.close();
  console.log('Mobile drawer captured!');
})();

