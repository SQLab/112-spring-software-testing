const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://pptr.dev/');

    const serachButton='.DocSearch-Button-Placeholder';
    await page.waitForSelector(serachButton);
    await page.click(serachButton);
    await page.waitForSelector('#docsearch-input');
    await page.type('#docsearch-input','chipi chipi chapa chapa');
    const pageButton = 'body > div:nth-child(1) > div > div > div > div > section:nth-child(2) > ul > li > a ';
    const button = await page.waitForSelector(pageButton);
    try{await page.click(pageButton);}catch(error){console.error(error)}
    const pageSelector = await page.waitForSelector('.theme-doc-markdown.markdown h1');
    const title = await pageSelector?.evaluate(element=>element.textContent);
    console.log(title);

    await browser.close();
})();