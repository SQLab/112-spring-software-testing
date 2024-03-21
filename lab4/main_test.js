const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Set screen size
    await page.setViewport({width: 1080, height: 1024});

    // Click search button
    const searchButtonSelector = '.DocSearch-Button';
    await page.waitForSelector(searchButtonSelector);
    await page.click(searchButtonSelector);

    // Type into search box
    const searchBoxSelector = '.DocSearch-Input';
    await page.waitForSelector(searchBoxSelector);
    await page.type(searchBoxSelector, 'chipi chipi chapa chapa');

    // Wait for all search request
    await page.waitForNetworkIdle();

    // Get the `Docs` result section
    const sectionSelector = 'section.DocSearch-Hits:nth-child(2)';
    const section = await page.waitForSelector(sectionSelector);

    // Click on first result in `Docs` section
    const result = await section.waitForSelector('.DocSearch-Hit:nth-child(1)');
    result.click();

    // Wait for redirection and the loading of inner frame
    await page.waitForNavigation();
    await page.waitForNetworkIdle();

    // Locate the title
    const textSelector = await page.waitForSelector('.markdown h1:first-child');
    const fullTitle = await textSelector?.evaluate(el => el.textContent);

    // Print the title
    console.log(fullTitle);

    // Close the browser
    await browser.close();
})();