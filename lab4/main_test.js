const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Hints:
    // Click search button
    await page.waitForSelector('.DocSearch-Button-Placeholder');
    await page.click('.DocSearch-Button-Placeholder');
    // Type into search box
    await page.waitForSelector('.DocSearch-Input');
    await page.type('.DocSearch-Input','chipi chipi chapa chapa', {delay: 1000});
    await page.waitForSelector('#docsearch-item-5 > a > div > div.DocSearch-Hit-content-wrapper > span.DocSearch-Hit-title');
    await page.click('#docsearch-item-5 > a > div > div.DocSearch-Hit-content-wrapper > span.DocSearch-Hit-title');
    const textselect = await page.waitForSelector('#__docusaurus_skipToContent_fallback > div > div > main > div > div > div > div > article > div.theme-doc-markdown.markdown > h1');
    const result = await textselect?.evaluate(el => el.textContent);
    console.log(result);
    // Wait for search result

    // Get the `Docs` result section
    // Click on first result in `Docs` section
    // Locate the title
    // Print the title

    // Close the browser
    await browser.close();
})();