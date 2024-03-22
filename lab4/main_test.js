const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Hints:
    // Click search button
    const searchButtonSelector = '.DocSearch-Button-Placeholder';
    const searchButton = await page.waitForSelector(searchButtonSelector);
    await searchButton.click();

    // Type into search box & Wait for search result
    const searchBoxSelector = '.DocSearch-Input';
    const searchBox = await page.waitForSelector(searchBoxSelector);
    await searchBox.type('chipi chipi chapa chapa', {delay: 100});

    // Get the `Docs` result section & Click on first result in `Docs` section
    const searchDocsSelector = '#docsearch-item-5';
    const searchDocs = await page.waitForSelector(searchDocsSelector);
    await searchDocs.click();

    // Locate the title
    const searchTitleSelector = 'h1';
    const searchTitle = await page.waitForSelector(searchTitleSelector);
    const title = await searchTitle.evaluate(el => el.textContent);

    // Print the title
    console.log(title);

    // Close the browser
    await browser.close();
})();