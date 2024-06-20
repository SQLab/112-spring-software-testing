const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Hints:
    // Click search button
    const searchButton = '.DocSearch-Button';
    await page.waitForSelector(searchButton);
    await page.click(searchButton);

    // Type into search box
    const searchBox = '.DocSearch-Input';
    await page.waitForSelector(searchBox);

    // Wait for search result
    await page.type(searchBox, 'chipi chipi chapa chapa' , { delay: 1000 });

    // Get the `Docs` result section
    const docsSection = '#docsearch-item-5';
    await page.waitForSelector(docsSection);

    // Click on first result in `Docs` section
    await page.click(docsSection);

    // Locate the title
    const textselector = await page.waitForSelector('.markdown h1');
    const title = await page.evaluate(element => element.textContent, textselector);

    // Print the title
    console.log(title);

    // Close the browser
    await browser.close();
})