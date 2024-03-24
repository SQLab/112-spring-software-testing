const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page

    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Hints:
    // Click search button
    await page.click('.DocSearch-Button-Placeholder');
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Type into search box
    await page.type('#docsearch-input', 'chipi chipi chapa chapa');
    // Wait for search result
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Get the `Docs` result section
    await page.click('#docsearch-item-5');
    // Click on first result in `Docs` section
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Locate the title
    const title = await page.title();
    // Print the title
    console.log(title);

    // Close the browser
    await browser.close();
})();
