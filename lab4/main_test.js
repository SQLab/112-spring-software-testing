const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        //headless: false
    });
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Hints:
    // Click search button
    const searchResultSelector = '.DocSearch-Button';
    await page.click(searchResultSelector);
    await page.waitForSelector(searchResultSelector);
    // Type into search box
    await page.type('.DocSearch-Button-Placeholder', 'chipi chipi chapa chapa', {delay: 200});
    // Wait for search result
    // Get the `Docs` result section
    const docsResultSelector = '[id=docsearch-item-5]';
    await page.waitForSelector(docsResultSelector);
    // Click on first result in `Docs` section
    await page.click(docsResultSelector);
    // Locate the title
    const textSelector = await page.waitForSelector('text/Experimental WebDriver');
    const fullTitle = await textSelector?.evaluate(el => el.textContent);
    // Print the title
    console.log(fullTitle);
    // Close the browser
    await browser.close();
})();
