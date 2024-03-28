const puppeteer = require("puppeteer");

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto("https://pptr.dev/");

    const searchBtnSelector = ".DocSearch.DocSearch-Button";
    await page.waitForSelector(searchBtnSelector);
    await page.click(searchBtnSelector);

    const searchInputSelector = ".DocSearch-Input";
    await page.waitForSelector(searchInputSelector);
    await page.type(searchInputSelector, "chipi chipi chapa chapa");

    await page.waitForNetworkIdle();

    const docsLiSelector = "#docsearch-item-5.DocSearch-Hit";
    await page.waitForSelector(docsLiSelector);
    await page.click(docsLiSelector);

    await page.waitForNetworkIdle();

    const titleSelector = await page.waitForSelector(
        ".theme-doc-markdown.markdown > h1"
    );
    const fullTitle = await titleSelector?.evaluate((e) => e.textContent);

    console.log(fullTitle);

    await browser.close();
})();
