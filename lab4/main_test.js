const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Hints:
    // Click search button
    const searchButtonSelector = '.DocSearch.DocSearch-Button';
    await page.waitForSelector(searchButtonSelector);
    await page.click(searchButtonSelector);

    // Type into search box
    // Wait for search result
    const inputSeletor = '#docsearch-input';
    await page.waitForSelector(inputSeletor);
    await page.type(inputSeletor, 'chipi chipi chapa chapa', {delay:100});
    
    // Get the `Docs` result section
    // Click on first result in `Docs` section
    const searchResultSelector = '#docsearch-item-5';
    await page.waitForSelector(searchResultSelector);
    await page.click(searchResultSelector);

    // Locate the title
    const textSelector = await page.waitForSelector('h1');
    const fullTitle = await textSelector?.evaluate(el=>el.textContent);
    
    // Print the title
    console.log(fullTitle);

    // Close the browser
    await browser.close();
})();