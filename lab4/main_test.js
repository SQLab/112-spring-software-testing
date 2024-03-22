const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Hints:
    // Click search button
    const searchButtonSelecctor = '.DocSearch-Button';
    await page.waitForSelector(searchButtonSelecctor);
    await page.click(searchButtonSelecctor);

    // Type into search box
    const searchInput = 'chipi chipi chapa chapa';
    const inputBoxSelector = '.DocSearch-Input';
    await page.waitForSelector(inputBoxSelector);
    await page.type(inputBoxSelector, searchInput);

    // Wait for search result
    await page.waitForNetworkIdle();

    // Get the `Docs` result section
    const sectionSelector = '.DocSearch-Hits';
    await page.waitForSelector(sectionSelector);
    const docsSections = await page.$$(sectionSelector);

    // for each section, find the child div with text 'Docs'
    let docsSection = null;
    for (let i = 0; i < docsSections.length; i++) {
        const text = await docsSections[i].$eval('div', div => div.textContent);
        if (text === 'Docs') {
            docsSection = docsSections[i];
            break;
        }
    }

    // if no `Docs` section found, throw an error
    if (!docsSection) {
        throw new Error('No `Docs` section found');
    }

    // Click on first result in `Docs` section
    const docsResultSelector = '.DocSearch-Hit-action';
    await docsSection.waitForSelector(docsResultSelector);
    await docsSection.click(docsResultSelector);

    // Locate the title
    const titleSelector = 'h1';
    await page.waitForSelector(titleSelector);
    
    // Print the title
    const title = await page.$eval(titleSelector, title => title.textContent);
    console.log(title);

    // Close the browser
    await browser.close();
})();