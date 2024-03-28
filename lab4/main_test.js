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
    // Type into search box
    const searchInput = 'chipi chipi chapa chapa';
    const searchInputSelector = '.DocSearch-Input';
    await page.waitForSelector(searchInputSelector);
    await page.type(searchInputSelector, searchInput, { delay: 700 }); 
    // Wait for search result
    // Get the `Docs` result section
    // Click on first result in `Docs` section
    await page.waitForSelector('#docsearch-item-5');
    await page.click('#docsearch-item-5');
    // Locate the title
    // Print the title




    const titleElement = await page.waitForSelector('.theme-doc-markdown > h1');
    const title = await titleElement?.evaluate(el => el.textContent);

    // 打印标题到控制台
    console.log(title);

    // 关闭浏览器
    await browser.close();
    // Close the browser
    await browser.close();
})();