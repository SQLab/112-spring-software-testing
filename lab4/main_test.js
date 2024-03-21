const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');
    // Set screen size
    await page.setViewport({width: 1080, height: 1024});

    const searchBtn = '.DocSearch-Button';
    await page.waitForSelector(searchBtn);
    await page.click(searchBtn);

    // Type into search box
    const input = '#docsearch-input'
    await page.waitForSelector(input);
    await page.type(input, 'chipi chipi chapa chapa');

    const linkBtn = 'text/Experimental WebDriver BiDi support'
    await page.waitForSelector(linkBtn);
    await page.click(linkBtn);

    // Locate the full title with a unique string
    const textSelector = await page.waitForSelector('h1');

    const fullTitle = await textSelector?.evaluate(el => el.textContent);
  
    // Print the full title
    console.log(fullTitle);

    // Close the browser
    await browser.close();
})();