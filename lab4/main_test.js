const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Click search button
    const searchButtonSelector = 'button[class="DocSearch DocSearch-Button"]';
    await page.waitForSelector(searchButtonSelector);
    await page.click(searchButtonSelector);

    // Type into search box & Wait for search result
    const searchInputSelector = 'input[class="DocSearch-Input"]';
    await page.waitForSelector(searchInputSelector);
    await page.type(searchInputSelector, 'chipi chipi chapa chapa', {delay: 200});

    // Wait for search result, then Click on the first result in `Docs` section
    const hitSelector = 'li[id="docsearch-item-5"]';
    await page.waitForSelector(hitSelector);
    await page.click(hitSelector);

    // Locate & Print the title
    const titleSelector = await page.waitForSelector('h1');
    const fullTitle = await titleSelector?.evaluate(el => el.textContent);
    console.log(fullTitle);

    // Close the browser
    await browser.close();
})();