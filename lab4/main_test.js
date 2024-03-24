const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Click search button
    const searchButtonSelector = '.DocSearch-Button';
    await page.waitForSelector(searchButtonSelector);
    await page.click(searchButtonSelector);
    
    // Type into search box
    const searchInputSelector = '.DocSearch-Input';
    await page.waitForSelector(searchInputSelector);
    await page.type(searchInputSelector, 'chipi chipi chapa chapa');
    
    // Wait for search result
    await page.waitForNetworkIdle();
    
    // Get the `Docs` result section
    const firstResultofDocsSelector = '#docsearch-item-5';
    await page.waitForSelector(firstResultofDocsSelector);
    
    // Click on first result in `Docs` section
    await page.click(firstResultofDocsSelector);
    
    // Locate the title
    const titleSelector = await page.waitForSelector('.theme-doc-markdown > h1');
    const title = await titleSelector?.evaluate(el => el.textContent);
    
    // Print the title
    console.log(title);

    // Close the browser
    await browser.close();
})();
