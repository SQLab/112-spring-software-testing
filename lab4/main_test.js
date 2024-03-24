const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/', { delay: 1000 });
    // Hints:
    // Click search button
    await page.click('.DocSearch-Button-Placeholder', { delay: 1000 });
    // Type into search box
    await page.type('#docsearch-input', 'chipi chipi chapa chapa', { delay: 100 });
    // Wait for search result
    // Get the `Docs` result section
    await page.click('#docsearch-item-5', { delay: 1000 });
    // Click on first result in `Docs` section
    // Locate the title
    await page.waitForSelector('.docItemContainer_Djhp');
    const title = await page.title();
    // Print the title
    console.log(title);
    // Close the browser
    await browser.close();
})();
