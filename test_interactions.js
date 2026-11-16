const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // 1. Test Quote Form: Select a service
  console.log('Testing Quote Form Service Selection...');
  await page.selectOption('#quoteService', 'flat-roof');
  await page.selectOption('#quoteProperty', 'semi');
  await page.waitForTimeout(300);

  const estimateText = await page.textContent('#estimateAmount');
  console.log('Dynamic Estimate Amount:', estimateText);
  await page.screenshot({ path: 'test_estimate_state.png' });

  // Fill in rest of form and submit
  await page.fill('#quotePostcode', 'M3 2EN');
  await page.fill('#quoteName', 'James Wilson');
  await page.fill('#quotePhone', '07522 613823');
  await page.fill('#quoteMessage', 'Need quote for new flat roof extension');
  await page.click('button[type="submit"]');

  await page.waitForSelector('#quoteSuccessCard:not(.hidden)', { timeout: 3000 });
  console.log('Form submitted successfully!');
  await page.screenshot({ path: 'test_quote_success.png' });

  // 2. Test Gallery Filter
  console.log('Testing Gallery Filter...');
  await page.click('button[data-filter="flat"]');
  await page.waitForTimeout(400);
  const visibleCards = await page.$$eval('.gallery-item', items => 
    items.filter(el => window.getComputedStyle(el).display !== 'none').length
  );
  console.log('Visible cards after filter "flat":', visibleCards);

  // 3. Test Project Lightbox Modal
  console.log('Testing Lightbox Modal...');
  await page.click('button[data-filter="all"]');
  await page.waitForTimeout(300);
  await page.click('.inspect-project-btn');
  await page.waitForSelector('#projectModal:not(.hidden)', { timeout: 2000 });
  console.log('Project modal opened!');
  const modalTitle = await page.textContent('#modalProjectTitle');
  console.log('Modal title:', modalTitle);
  await page.screenshot({ path: 'test_modal_open.png' });

  // Close modal
  await page.click('#projectModalClose');
  await page.waitForTimeout(300);

  // 4. Test Area Search
  console.log('Testing Area Search...');
  await page.fill('#areaSearchInput', 'Didsbury');
  await page.waitForTimeout(300);
  const searchResult = await page.textContent('#areaSearchResult');
  console.log('Area Search Result:', searchResult.trim());

  await browser.close();
  console.log('All interactive tests passed!');
})();

