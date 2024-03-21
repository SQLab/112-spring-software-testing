const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');
    const searchButtonSelector = 'button.DocSearch.DocSearch-Button';
    const button = await page.waitForSelector(searchButtonSelector);
    await button.click();

    const inputSelector = 'input.DocSearch-Input';
    const inputBox = await page.waitForSelector(inputSelector);
    inputBox.focus();
    await inputBox.type('chipi chipi chapa chapa');
    const resultSelector = 'li#docsearch-item-5.DocSearch-Hit';
    const result = await page.waitForSelector(resultSelector);
    await result.click();
    const titleSelector = await page.waitForSelector('text/Experimental WebDriver BiDi support');
    const fullTitle = await titleSelector?.evaluate(el => el.textContent);
    console.log(fullTitle);
    // Hints:
    // Click search button
    // Type into search box
    // Wait for search result
    // Get the `Docs` result section
    // Click on first result in `Docs` section
    // Locate the title
    // Print the title

    // Close the browser
    await browser.close();
})();