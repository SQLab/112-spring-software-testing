const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://pptr.dev/');

    await page.click('.DocSearch-Button-Placeholder');

    const searchInputSelector = '#docsearch-input';
    await page.waitForSelector(searchInputSelector);
    await page.type(searchInputSelector, 'chipi chipi chapa chapa', {delay: 500});

    const searchResultSelector = '#docsearch-item-5';
    await page.waitForSelector(searchResultSelector);  
    await page.click(searchResultSelector);
    
    const textSelector = await page.waitForSelector('h1');
    const fullTitle = await textSelector.evaluate(el => el.textContent);
    console.log('%s', fullTitle);
    await browser.close();
})();