const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Hints:
    // Click search button
    const searchResultSelector = '.DocSearch-Button-Placeholder'; 
    await page.waitForSelector(searchResultSelector);
    await page.click(searchResultSelector);

    // Type into search box
    const searchBoxSelector = '.DocSearch-Input';
    await page.waitForSelector(searchBoxSelector);
    await page.type(searchBoxSelector,'chipi chipi chapa chapa');

    // Wait for search result
    await page.waitForNetworkIdle();

    // Get the `Docs` result section
    const firstDocResultSelector = '#docsearch-item-5'; // # is for id
    await page.waitForSelector(firstDocResultSelector); 

    // Click on first result in `Docs` section
    await page.click(firstDocResultSelector);
    await page.waitForNetworkIdle();
    
    // Locate the title
    const titleSelector = await page.waitForSelector('.theme-doc-markdown.markdown > h1');
    const title = await titleSelector.evaluate(el => el.textContent);

    // Print the title
    console.log(title);

    // Close the browser
    await browser.close();
})();