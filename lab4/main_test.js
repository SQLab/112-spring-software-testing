const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://pptr.dev/');

    await page.click('.DocSearch-Button') ;

    const searchBox = '.DocSearch-Input' ;
    const searchKey = 'chipi chipi chapa chapa' ;
    await page.waitForSelector(searchBox) ;
    await page.type(searchBox, searchKey) ;
    await page.waitForSelector('section.DocSearch-Hits > ul#docsearch-list > li.DocSearch-Hit > a[href="/webdriver-bidi/#measuring-progress"]') ;

    const searchList = await page.$$('section.DocSearch-Hits') ;
    for (const listItem of searchList) {
        try {
            const docsResult = await page.evaluate(el => 
                el.querySelector('.DocSearch-Hit-source').textContent, listItem 
            ) ;
            if (docsResult === "Docs") {
                await page.click('ul#docsearch-list > li.DocSearch-Hit > a[href="/webdriver-bidi/#measuring-progress"]') ;
                await page.waitForSelector('h2.anchor > a[href="#measuring-progress"]') ; 
                const title = await page.title() ;
                const title_string = await page.evaluate(() => document.querySelector('h1').textContent, title) ;
                console.log(title_string) ;
                break ;
            }
        }
        catch (error) {}
    }
    
    await browser.close();
})();
