const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');
    
    // click search button
    const searchButtonSelector = '#__docusaurus > nav > div.navbar__inner > div.navbar__items.navbar__items--right > div.navbarSearchContainer_Bca1 > button';
    await page.waitForSelector(searchButtonSelector);
    await page.click(searchButtonSelector);

    // Type into search box
    const searchBoxSelector = '#docsearch-input';
    await page.waitForSelector(searchBoxSelector);
    await page.type(searchBoxSelector, 'chipi chipi chapa chapa', {delay: 100});

    // Wait and click on docs first result
    const firstResultSelector = '#docsearch-item-5';
    await page.waitForSelector(firstResultSelector);
    await page.click(firstResultSelector);

    // Locate the full title with a unique string
    const titleSelector = '#__docusaurus_skipToContent_fallback > div > div > main > div > div > div.col.docItemCol_VOVn > div > article > div.theme-doc-markdown.markdown > h1';
    await page.waitForSelector(titleSelector);
    // Print the full title
    const title = await page.$eval(titleSelector, el => el.textContent);
    console.log(title);

    // Close the browser
    await browser.close();
})();