const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev');

    const btn = await page.waitForSelector('#__docusaurus > nav > div.navbar__inner > div.navbar__items.navbar__items--right > div.navbarSearchContainer_Bca1 > button')

    await btn.click();

    const input = await page.waitForSelector('#docsearch-input') 

    // await input.click();

    await page.type('#docsearch-input', 'chipi chipi chapa chapa', {delay: 100})

    const searchResultTest = await page.waitForSelector('body > div:nth-child(1) > div > div > div > div > section:nth-child(2)')

    const result = await searchResultTest.$('a')

    const link = await page.evaluate(result => result.href, result)

    // const screenShot = await page.screenshot({path: 'screenshot.png'});

    await page.goto(link)

    const titleDiv = await page.waitForSelector('h1')

    console.log(await page.evaluate(titleDiv => titleDiv.textContent, titleDiv))

    await browser.close();
})();

