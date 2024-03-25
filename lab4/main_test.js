const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://pptr.dev/');

    const serachButton='.DocSearch-Button-Placeholder';
    await page.waitForSelector(serachButton);
    await page.click(serachButton);
    await page.waitForSelector('#docsearch-input');
    await page.type('#docsearch-input','chipi chipi chapa chapa');
    // const searchBar = await page.waitForSelector('.DocSearch-Dropdown-Container');
    // const Docs = await searchBar?.$$('.DocSearch-Hits');
    const pageButton = '#docsearch-item-5';
    const button = await page.waitForSelector(pageButton);
    const b = await button?.waitForSelector('.DocSearch-Hit-Select-Icon');
    const a = await b?.evaluate(element => {
        if (element) {
          // Extract information about the element
          return {
            tagName: element.tagName,
            textContent: element.textContent,
            attributes: Array.from(element.attributes).map(attr => ({ name: attr.name, value: attr.value }))
          };
        } else {
          return null; // If element is not found, return null
        }
      });
    console.log(a);
    try{await b.click();}catch(error){console.error(error)}
    // await page.waitForNavigation();
    console.log('Navigation complete. Current URL:', page.url());
    const pageSelector = await page.waitForSelector('.theme-doc-markdown.markdown ul');
    // const titleSelector = await pageSelector.waitForSelector('.h1');
    const title = await pageSelector?.evaluate(element=>element.textContent);
    console.log(title);

    await browser.close();
})();