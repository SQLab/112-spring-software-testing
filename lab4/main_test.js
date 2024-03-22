const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Hints:
    // Click search button
    const searchResultSelector = '.DocSearch-Button';
    await page.waitForSelector(searchResultSelector);
    await page.click(searchResultSelector);
    // Type into search box
    const InputSelector = '.DocSearch-Input';  //form.DocSearch-Form input#docsearch-input
    await page.waitForSelector(InputSelector);
    await page.type(InputSelector, 'chipi chipi chapa chapa', { delay: 700 });
    // Wait for search result
    const ResultSelector = '.DocSearch-Hit-title'

    // Get the `Docs` result section
    await page.waitForSelector(ResultSelector)
    // Click on first result in `Docs` section
    await page.click(ResultSelector)
    // Locate the title
    const textSelector = await page.waitForSelector(
        'text/Experimental WebDriver'
    );
    const Title = await textSelector?.evaluate(el => el.textContent);
    // Print the title
    console.log(Title)
    // Close the browser
    await browser.close();
})();