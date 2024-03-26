const puppeteer = require("puppeteer");

(async () => {
    // open website
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://pptr.dev/");
    
    // click search box
    const searchArea = ".DocSearch-Button"
    await page.waitForSelector(searchArea);
    await page.click(searchArea);
    
    // type and srearch
    const searchBox = ".DocSearch-Input";
    const searchText = "chipi chipi chapa chapa";
    await page.waitForSelector(searchBox);
    await page.type(searchBox, searchText, { delay: 1000 });
    
    // click search item
    const docsSearchItem = "#docsearch-item-5"
    await page.waitForSelector(docsSearchItem);
    await page.click(docsSearchItem);
    
    // select and print text
    const title = await page.waitForSelector('.markdown h1');
    const titleText = await page.evaluate(x => x.textContent, title);
    console.log(titleText);

    // close browser
    await browser.close();
})();
