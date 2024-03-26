const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Hints:
    // Click search button
    const searchButtonSelector = '.DocSearch-Button';
    await page.waitForSelector(searchButtonSelector);
    await page.click(searchButtonSelector);

    // Type into search box'
    await page.waitForSelector('.DocSearch-Input');
    await page.type('.DocSearch-Input', 'chipi chipi chapa chapa', {delay: 1000}); 
 
    // Get the `Docs` result section
    const searchResultSelector = '#docsearch-item-5';
    await page.waitForSelector(searchResultSelector);  
    
    // Click on first result in `Docs` section
    await page.click(searchResultSelector);

    // Locate the title
    const textSelector = await page.waitForSelector('h1');
    const Title = await textSelector.evaluate(el => el.textContent);
         
    // Print the title
    console.log('%s',Title);
        
    // Close the browser
    await browser.close();
})(); 
