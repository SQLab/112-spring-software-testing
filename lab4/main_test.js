const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Hints:
    // Click search button
    try {
        // Wait for the button to be present in the DOM
        const searchButton = '.DocSearch.DocSearch-Button';
        await page.waitForSelector(searchButton);
        await page.click(searchButton);
    } catch (error) {
        console.error('Button not found or could not be clicked:', error);
    }

    // Type into search box
    try {
        // Wait for the search box to be present in the DOM
        await page.waitForSelector('.DocSearch-Input');

        // Type into the search box
        await page.type('.DocSearch-Input', 'chipi chipi chapa chapa', {delay: 500});  
    } catch (error) {
        console.error('Search box not found or could not be typed into:', error);
    }

    // Wait for search result
    // Get the `Docs` result section
    // Click on first result in `Docs` section
    try {
        // Wait for the search result to be present in the DOM
        const searchResult = "[id='docsearch-item-5']";
        await page.waitForSelector(searchResult);
        await page.click(searchResult);
    } catch (error) {
        console.error('Search result button not found:', error);
    }
    
    // Locate the title
    const textselector = await page.waitForSelector('.markdown h1:first-child');
    const title = await page.evaluate(textselector => textselector.textContent, textselector);

    // Print the title
    console.log(title);

    // Close the browser
    await browser.close();
})();