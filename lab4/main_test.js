const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');
    await new Promise(resolve => setTimeout(resolve, 3000));

    const searchBarButton = '.DocSearch.DocSearch-Button';
    await page.waitForSelector(searchBarButton);
    await page.click(searchBarButton);
    await new Promise(resolve => setTimeout(resolve, 3000));

    const searchBarInput = '#docsearch-input'
    await page.waitForSelector(searchBarInput);
    await page.type(searchBarInput, 'chipi chipi chapa chapa');
    await new Promise(resolve => setTimeout(resolve, 3000));

    const firstDoc = 'section.DocSearch-Hits:nth-of-type(2) li:nth-of-type(1)';
    await page.waitForSelector(firstDoc);
    await page.click(firstDoc);
    await new Promise(resolve => setTimeout(resolve, 3000));

    const title = 'h1';
    await page.waitForSelector(title);
    const text = await page.$eval(title, element => element.textContent);
    console.log(text);

    // Close the browser
    await browser.close();
})();