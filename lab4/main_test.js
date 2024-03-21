const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Click search button
    const searchbtnSelector = '.DocSearch-Button-Placeholder';
    await page.waitForSelector(searchbtnSelector);
    await page.click(searchbtnSelector);

    // Type into search box
    const searchbarSelector = '.DocSearch-Input'
    await page.waitForSelector(searchbarSelector);
    await page.type(searchbarSelector, 'chipi chipi chapa chapa', {delay: 100});
    
    // Click on first result in `Docs` section
    const firstDocResultSelector = '#docsearch-item-5';
    await page.waitForSelector(firstDocResultSelector);
    await page.click(firstDocResultSelector);

    // Locate the title
    const titleSelector = '.theme-doc-markdown > h1';
    const titleElement = await page.waitForSelector(titleSelector);
    const title = await titleElement?.evaluate(el => el.textContent);

    // Print the title
    console.log(title);

    // Close the browser
    await browser.close();
})();