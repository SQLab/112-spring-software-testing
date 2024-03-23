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
    await page.waitForSelector('.DocSearch-Form');
    await page.type('.DocSearch-Form', 'chipi chipi chapa chapa');

    
    // Wait for search result
    await page.waitForNetworkIdle();
    
    let x = await page.waitForSelector('.DocSearch-Dropdown');

    // Get the `Docs` result section
    // Click on first result in `Docs` section

    const sections = await page.$$('.DocSearch-Hits');


    for (const section of sections) {
        const text = await section.$eval('.DocSearch-Hit-source', (el)=>el.innerHTML);
        if(text === "Docs"){
             const hit = await section.$(".DocSearch-Hit");
            await hit.click();
            break;
        }
    }

    // Locate the title
    const textSelector = await page.waitForSelector(
        '.markdown h1:first-child'
    );

    const fullTitle = await textSelector?.evaluate(el => el.textContent);
   
    // Print the title
    console.log(fullTitle);


    // Close the browser
    await browser.close();
})();