const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Hints:
    // Click search button
    const searchButton = 'button.DocSearch-Button';
    await page.click(searchButton);

    // Type into search box
    const searchBox = 'input.DocSearch-Input';
    await page.waitForSelector(searchBox);
    await page.type(searchBox, 'chipi chipi chapa chapa', { delay: 100 });

    // Wait for search result
    const searchResult = 'div.DocSearch-Dropdown-Container';
    await page.waitForSelector(searchResult);

    // Get the `Docs` result section
    const docsFirstLink = searchResult + ' section.DocSearch-Hits:nth-child(2) a';
    await page.waitForSelector(docsFirstLink);

    // Click on first result in `Docs` section
    await page.click(docsFirstLink);

    // Locate the title
    const title = 'div.theme-doc-markdown h1';
    const element = await page.waitForSelector(title);

    // Print the title
    let titleText = await page.evaluate(el => el.textContent, element)
    console.log(titleText);

    // Close the browser
    await browser.close();
})();