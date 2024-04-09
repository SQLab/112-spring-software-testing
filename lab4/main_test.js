const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Hints:
    // Click search button
    await page.click('button.DocSearch.DocSearch-Button');
    


    // Type into search box
    await page.waitForSelector('#docsearch-input');
    await page.type('#docsearch-input', 'chipi chipi chapa chapa',{delay: 1000});
    // Wait for search result
    await page.waitForSelector('body > div:nth-child(1) > div > div > div > div > section:nth-child(2) > ul > li:nth-child(1)');
    // Get the `Docs` result section
    // Click on first result in `Docs` section
    await page.click('body > div:nth-child(1) > div > div > div > div > section:nth-child(2) > ul > li:nth-child(1)');
    
    // // Locate the title
    const textSelector = await page.waitForSelector('h1');
    const fulltitle = await textSelector?.evaluate(el=> el.textContent);
    // // Print the title
    console.log('%s',fulltitle);
    // Close the browser
    await browser.close();
})();
