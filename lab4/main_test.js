const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Set screen size
    await page.setViewport({width: 1080, height: 1024});

    // Click search button
    const searchButtonSelector = '.DocSearch-Button';
    await page.waitForSelector(searchButtonSelector);
    await page.click(searchButtonSelector);

    // Type into search box
    const searchBoxSelector = '.DocSearch-Input';
    await page.waitForSelector(searchBoxSelector);

    // Wait for search result
    await page.type(searchBoxSelector, 'chipi chipi chapa chapa', {delay: 100});
    
    // Get the `Docs` result section
    const searchResultSelector = "[id='docsearch-item-5']";
    await page.waitForSelector(searchResultSelector);

    // Click on first result in `Docs` section
    await page.click(searchResultSelector);

    // Locate the title
    const textSelector = await page.waitForSelector(
        '.markdown h1:first-child'
    );

    // Print the title
    const fullTitle = await textSelector?.evaluate(el => el.textContent);
    console.log(fullTitle);

    // Close the browser
    // await page.screenshot({path: 'example.png'});
    await browser.close();
})();