const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Click search button
    await page.waitForSelector('.DocSearch-Button-Placeholder');
    await page.click('.DocSearch-Button-Placeholder');
    // Type into search box
    await page.waitForSelector('.DocSearch-Input');
    await page.type('.DocSearch-Input', 'chipi chipi chapa chapa', {delay:500});
    // Click on first result in `Docs` section
    await page.waitForSelector('#docsearch-item-5');
    await page.click('#docsearch-item-5');
    // Locate the title
    const titleElement = await page.waitForSelector('.theme-doc-markdown > h1');
    const title = await titleElement?.evaluate(el => el.textContent);
    // Print the title
    console.log(title);

    // Close the browser
    await browser.close();
})();