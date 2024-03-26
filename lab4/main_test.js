const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');
    
    // Click the search button
    await page.click('.DocSearch-Button');

    // Wait and type into search box
    await page.waitForSelector('.DocSearch-Input');
    await page.type('.DocSearch-Input', 'chipi chipi chapa chapa');
    
    // Wait and click on 5th search result
    const searchResultSelector = '#docsearch-item-5';
    await page.waitForSelector(searchResultSelector);
    await page.click(searchResultSelector);

    // Wait and locate element with unique string
    const textSelector = await page.waitForSelector(
        'text/Experimental WebDriver'
    );
    const fullTile = await textSelector?.evaluate(el => el.textContent);

    // print the result
    console.log('%s', fullTile);

    // Close the browser
    await browser.close();
})();
