const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://pptr.dev/');

    const buttonSelector = '.DocSearch-Button';
    await page.waitForSelector(buttonSelector);
    await page.click(buttonSelector);

    const searchInputSelector = '.DocSearch-Input';
    await page.waitForSelector(searchInputSelector);
    await page.type(searchInputSelector, 'chipi chipi chapa chapa', {delay: 100});

    await page.waitForTimeout(100);

    const docResultSelector = '#docsearch-item-5';
    await page.waitForSelector(docResultSelector);

    const firstDocResult = await page.$(docResultSelector);
    await firstDocResult.click();

    await page.waitForNavigation();

    const titleSelector = '.markdown h1:first-child';
    await page.waitForSelector(titleSelector);

    const titleText = await page.$eval(titleSelector, element => element.textContent);

    console.log(titleText);

    await browser.close();
})();
