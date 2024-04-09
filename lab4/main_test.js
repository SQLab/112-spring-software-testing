const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Hints:
    // Click search button
    const searchButtonSelectorText = '.DocSearch-Button';
    const searchButton = await page.waitForSelector(searchButtonSelectorText);
    await searchButton.click();

    // Type into search box
    const searchBoxSelectorText = '.DocSearch-Input';
    const searchBox = await page.waitForSelector(searchBoxSelectorText);
    await searchBox.type('chipi chipi chapa chapa');

    // Wait for search result
    await page.waitForNetworkIdle();

    // Get the `Docs` result section
    const selctionSelectors = await page.$$('.DocSearch-Hit-source');
    let i;
    for ( i = 0; i < selctionSelectors.length; i++ ) {
        const text = await selctionSelectors[i].evaluate(element => element.textContent);
        if ( text === 'Docs' ) {
            break
        }
    }
    const docSectionSelectorText = 'section.DocSearch-Hits:nth-child('+ (i+1) + ')';
    const docSection = await page.waitForSelector(docSectionSelectorText);
    
    // Click on first result in `Docs` section
    const firstDocResultSelectorText = '.DocSearch-Hit:nth-child(1)';
    const firstTitleSelector = await docSection.waitForSelector(firstDocResultSelectorText);
    await firstTitleSelector.click();

    // Locate the title
    const titleSelectorText = '.theme-doc-markdown > h1';
    const titleSelector = await page.waitForSelector(titleSelectorText);
    const titleText = await titleSelector.evaluate(el => el.textContent);

    // Print the title
    console.log(titleText);

    // Close the browser
    await browser.close();
})();