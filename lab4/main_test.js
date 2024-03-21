const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://pptr.dev/');
    const searchButtonSelector = 'button.DocSearch.DocSearch-Button';
    const button = await page.waitForSelector(searchButtonSelector);
    await button.click();

    const inputSelector = 'input.DocSearch-Input';
    const inputBox = await page.waitForSelector(inputSelector);
    inputBox.focus();
    await inputBox.type('chipi chipi chapa chapa');
    const resultSelector = 'li#docsearch-item-5.DocSearch-Hit';
    const result = await page.waitForSelector(resultSelector);
    await result.click();
    const titleSelector = await page.waitForSelector('text/Experimental WebDriver BiDi support');
    const fullTitle = await titleSelector?.evaluate(el => el.textContent);
    console.log(fullTitle);
    await browser.close();
})();