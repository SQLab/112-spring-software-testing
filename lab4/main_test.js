const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Click search button
    await page.waitForSelector('svg.DocSearch-Search-Icon');
    const searchBtn = await page.$('svg.DocSearch-Search-Icon');
    await searchBtn.click();

    // Type into search box
    await page.waitForSelector('input.DocSearch-Input');
    const input = await page.$('input.DocSearch-Input');
    await input.type('chipi chipi chapa chapa');

    // Wait for search result
    await new Promise(r => setTimeout(r, 1000));
    await page.waitForSelector('div.DocSearch-Dropdown-Container');
    searchResult = await page.$('div.DocSearch-Dropdown-Container');

    // Get the `Docs` result section
    // Click on first result in `Docs` section
    const resultSections = await searchResult.$$('section.DocSearch-Hits');
    for (const section of resultSections) {
        const sourceDiv = await section.$('div.DocSearch-Hit-source');
        const sourceText = await page.evaluate(el => el.innerText, sourceDiv);
        if (sourceText.trim() === 'Docs') {
            const link = await section.$('ul#docsearch-list li:first-child a');
            await Promise.all([
                page.waitForNavigation(),
                link.evaluate(a => a.click()),
            ]);
            break;
        }
    }

    // Locate the title
    const title = await page.$('h1');
    const titleText = await page.evaluate(el => el.innerText, title);

    // Print the title
    console.log(titleText);

    // Close the browser
    await browser.close();
})();
