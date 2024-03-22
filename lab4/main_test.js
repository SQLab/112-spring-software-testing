const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Hints:
    // Click search button
    await page.waitForSelector('button.DocSearch.DocSearch-Button');
    await page.click('button.DocSearch.DocSearch-Button');
    // Type into search box
    await page.waitForSelector('.DocSearch-Input');
    await page.type('.DocSearch-Input','chipi chipi chapa chapa');
    // Wait for search result
    // Get the `Docs` result section
    // Click on first result in `Docs` section
    const searchResultSelector = 'body > div:nth-child(1) > div > div > div > div > section:nth-child(2) > ul > li > a ';
    await page.waitForSelector(searchResultSelector);
    await page.click(searchResultSelector);
    // Locate the title
    // Print the title
    const textSelector = await page.waitForSelector(
    '.theme-doc-markdown.markdown > h1'
    );
    const fullTitle = await textSelector?.evaluate(el => el.textContent);
    // Close the browser
    console.log(fullTitle);
    await browser.close();
})();
