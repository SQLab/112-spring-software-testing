const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Click search button
    const searchButton = '.DocSearch-Button-Placeholder';
    await page.waitForSelector(searchButton);
    await page.click(searchButton);
    // Type into search box

    await page.type('.DocSearch-Button-Placeholder', 'chipi chipi chapa chapa', { delay: 500 });
    // Wait for search result
    // Get the `Docs` result section
    const searchResult = '#docsearch-item-5';
    await page.waitForSelector(searchResult);
    await page.click(searchResult);

    // Click on first result in `Docs` section
    // Locate the title
    const h1Selector = await page.waitForSelector('h1');
    const result = await h1Selector?.evaluate(el => el.textContent);
    
    // Print the title
    console.log(result);
    // Close the browser
    await browser.close();
})();