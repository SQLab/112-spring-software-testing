const puppeteer = require('puppeteer');

(async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://pptr.dev/');

    await page.waitForSelector('.DocSearch-Button');
    await page.click('.DocSearch-Button');

    await page.waitForSelector('.DocSearch-Input');
    await page.type('.DocSearch-Input', 'chipi chipi chapa chapa', {delay: 500}); 

    await page.waitForSelector("#docsearch-item-5");
    await page.click("#docsearch-item-5");

    const titleSelector = await page.waitForSelector('.markdown h1');
    const title = await page.evaluate(titleSelector => titleSelector.textContent, titleSelector);
    
    console.log(title);

})();
