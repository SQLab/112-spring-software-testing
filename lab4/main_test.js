const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Hints:
    // Click search button
    const searchButtonElement = await page.waitForSelector('#__docusaurus > nav > div.navbar__inner > div.navbar__items.navbar__items--right > div.navbarSearchContainer_Bca1 > button');
    await searchButtonElement.click();

    // Type into search box
    const searchInputElement = await page.waitForSelector('#docsearch-input');
    await searchInputElement.type('chipi chipi chapa chapa', { delay: 1000 });

    // Wait for search result
    // Get the `Docs` result section
    // Click on first result in `Docs` section
    const resultElement = await page.waitForSelector('#docsearch-item-5');
    await resultElement.click();

    // Locate the title
    const titleElement = await page.waitForSelector('#__docusaurus_skipToContent_fallback > div > div > main > div > div > div > div > article > div.theme-doc-markdown.markdown > h1');

    // Print the title
    console.log(await page.evaluate(titleElement => titleElement.textContent, titleElement));

    // Close the browser
    await browser.close();
})();