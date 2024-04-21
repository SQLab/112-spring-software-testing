const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Hints:
    // Click search button
    const searchSelector = '.DocSearch-Button-Placeholder';
    await page.waitForSelector(searchSelector);
    await page.click(searchSelector);
    // Type into search box
    const inputSelector = '#docsearch-input';
    await page.waitForSelector(inputSelector);
    await page.type(inputSelector, 'chipi chipi chapa chapa', {delay: 1000});
    // Wait for search result
    const itemSelector = '#docsearch-item-5';
    const linkSelector = await page.waitForSelector(itemSelector);
    await linkSelector.click();
    // Get the `Docs` result section
    // Click on first result in `Docs` section
    // // Locate the title
    const textSelector = await page.waitForSelector('h1');
    const fullTitle = await textSelector?.evaluate(el => el.textContent);
    // // Print the title
    console.log(fullTitle);
    // Close the browser
    await browser.close();
})();