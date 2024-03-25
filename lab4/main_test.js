const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Hints:
    // Click search button
    // Type into search box
    // Wait for search result
    // Get the `Docs` result section
    // Click on first result in `Docs` section
    // Locate the title
    // Print the title

    // Click search button
    const button = '.DocSearch.DocSearch-Button';
    await page.waitForSelector(button);
    await page.click(button);

    // Type into search box
    await page.waitForSelector('.DocSearch-Input');
    await page.type('.DocSearch-Input', 'chipi chipi chapa chapa', {delay: 500}); 

    // Get the `Docs` result section
    const res = "[id='docsearch-item-5']";
    await page.waitForSelector(res);

    // Click on first result in `Docs` section
    await page.click(res);

    // Locate the title
    const textselector = await page.waitForSelector('.markdown h1:first-child');
    const text = await page.evaluate(textselector => textselector.textContent, textselector);

    // Print the title
    console.log(text);

    // Close the browser
    await browser.close();
})();