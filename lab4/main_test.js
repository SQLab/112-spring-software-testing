// use puppeteer package for web test
const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Click search button 
    const serach_button_selector = 'button.DocSearch.DocSearch-Button[aria-label="Search"]';
    await page.waitForSelector(serach_button_selector);
    await page.click(serach_button_selector);    

    // Type into search box 
    const search_box_sector = '#docsearch-input';
    await page.waitForSelector(search_box_sector);

    // Put keyboard input to search box
    await page.keyboard.type('chipi chipi chapa chapa');

    // Wait for search result 
    await page.type(search_box_sector, 'chipi chipi chapa chapa', { delay: 300 });

    // Get first result in `Docs` section
    const search_result_selector = "[id='docsearch-item-5']";
    await page.waitForSelector(search_result_selector);
    
    // Click on first result in `Docs` section
    await page.click(search_result_selector);

    // Locate the title
    const title_selector = await page.waitForSelector('div.theme-doc-markdown.markdown h1');
    const title = await title_selector?.evaluate( element => element.textContent );

    // Print the title
    console.log(title);

    // Close the browser
    await browser.close();
})();