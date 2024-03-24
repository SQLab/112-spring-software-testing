const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/', { delay: 1000 });
    // Hints:
    // Click search button
    await page.click('.DocSearch-Button-Placeholder', { delay: 1000 });
    // Type into search box
    await page.type('#docsearch-input', 'chipi chipi chapa chapa', { delay: 100 });
    // Wait for search result
    // Get the `Docs` result section
    await page.click('#docsearch-item-5', { delay: 1000 });
    // Click on first result in `Docs` section
     // Locate the title
    const text_selector = await page.waitForSelector('.theme-doc-markdown.markdown h1');
    // Get the text content of the h1 element
    const title_content = await page.evaluate(text_selector => text_selector.textContent, text_selector);
    // Print the title
    console.log(title_content);
    // Close the browser
    await browser.close();
})();
