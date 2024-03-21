const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Click on search button
    await page.click('.DocSearch-Button-Placeholder');

    // Type into search box
    const searchBox = await page.waitForSelector('form.DocSearch-Form input#docsearch-input');
    await searchBox.type('chipi chipi chapa chapa');

    // Get the first result in `Docs` section and click on it
    const firstResult = await page.$('section.DocSearch-Hits:nth-child(2) > ul:nth-child(2)');
    await firstResult.click();

    // Locate the title
    await page.waitForSelector('.theme-doc-markdown > h1:nth-child(1)');

    // Print the title
    const title = await page.$eval('.theme-doc-markdown > h1:nth-child(1)', el => el.textContent.trim());
    console.log(title);

    // Close the browser
    await browser.close();
})();