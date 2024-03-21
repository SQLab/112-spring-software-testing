const puppeteer = require('puppeteer');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');
    page.click("button.DocSearch");
    await sleep(1000);
    page.type("form", "chipi chipi chapa chapa")
    await sleep(1000); 

    const sections = await page.$$('section');
    const lili = await sections[1].$('li');

    const [response] = await Promise.all([
        page.waitForNavigation(),
        await lili.click(),
    ]);

    await sleep(1000); 

    const h1Text = await page.$eval('h1', element => element.textContent);
    console.log(h1Text);

    // Close the browser
    await browser.close();
    
    return h1Text;
})();