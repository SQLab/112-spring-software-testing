const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');
    const searchButtonText = '.DocSearch-Button';
    await page.waitForSelector(searchButtonText);
    await page.click(searchButtonText);
    const searchInputText = '#docsearch-input';
    await page.waitForSelector(searchInputText);
    await page.type(searchInputText,'chipi chipi chapa chapa');
    await page.waitForNetworkIdle();
    const needSector = '#docsearch-item-5 > a > div';
    await page.waitForSelector(needSector);
    await page.click(needSector);
    const titleSelector = await page.waitForSelector('.theme-doc-markdown.markdown > h1');
    const title = await titleSelector.evaluate(el => el.textContent);
    console.log(title);
    await browser.close();
})();