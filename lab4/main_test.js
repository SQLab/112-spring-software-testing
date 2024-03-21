const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Hints:
    // Click search button
    const searchbuttonSelector = '.DocSearch-Button';
    await page.waitForSelector(searchbuttonSelector);
    await page.click(searchbuttonSelector);

    // Type into search box
    // Wait for search result
    const searchInputSelector = '.DocSearch-Input';
    const searchInput = 'chipi chipi chapa chapa';
    await page.waitForSelector(searchInputSelector);
    await page.type(searchInputSelector, searchInput, { delay: 500 });

    // Get the `Docs` result section
    // Click on first result in `Docs` section
    const searchDocSelector = '#docsearch-item-5';
    await page.waitForSelector(searchDocSelector);
    await page.click(searchDocSelector);

    // Locate the title

    const textSelector = await page.waitForSelector('.theme-doc-markdown.markdown h1');
    const fullTitle = await textSelector?.evaluate(el => el.textContent);

    // Print the title
    console.log(fullTitle);

    // Close the browser
    await browser.close();
})();
