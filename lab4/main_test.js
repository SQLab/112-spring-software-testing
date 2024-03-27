const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Hints:
    // Click search button
    // Type into search box
    // Wait for search result
    // Get the `Docs` result section
    // Click on first result in `Docs` section
    // Locate the title
    // Print the title

    await page.click('button[class="DocSearch DocSearch-Button"]');

    await page.waitForSelector('input[class="DocSearch-Input"]');
    await page.type('input[class="DocSearch-Input"]', 'chipi chipi chapa chapa', { delay: 1000 });

    await page.waitForSelector('#docsearch-item-5');
    await page.click('#docsearch-item-5');
    
    const titleSelector = await page.waitForSelector('h1');
    const title = await titleSelector?.evaluate(el => el.textContent);
    console.log(title);

    // Close the browser
    await browser.close();
})();