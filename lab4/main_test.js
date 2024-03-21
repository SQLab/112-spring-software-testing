const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Hints:
    // Click search button

    await page.waitForSelector('.DocSearch-Button-Placeholder');
    await page.click('.DocSearch-Button-Placeholder');

    // Type into search box
    const inputSearchSeletor = '#docsearch-input';
    const inputStr = 'chipi chipi chapa chapa'
    await page.waitForSelector(inputSearchSeletor);
    await page.type(inputSearchSeletor, inputStr, {delay:100});


    // Wait for search result
    // Get the `Docs` result section
    // Click on first result in `Docs` section
    // Locate the title

    const docsFirstItemSelector = '#docsearch-item-5';
    await page.waitForSelector(docsFirstItemSelector);
    await page.click(docsFirstItemSelector);

    const titleSelectorName = 'h1';
    const titleSelector = await page.waitForSelector(titleSelectorName);
    const titleText = await titleSelector?.evaluate(el => el.textContent);


    // Print the title
    console.log(titleText)

    // Close the browser
    await browser.close();
})();