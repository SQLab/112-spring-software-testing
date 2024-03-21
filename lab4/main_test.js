const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Click search button
    await page.click('::-p-aria(Search)');
    // Type into search box
    await page.keyboard.type('chipi chipi chapa chapa', { delay: 100 });
    // Wait for search result
    await page.waitForSelector('section.DocSearch-Hits');
    const sections = await page.$$('section.DocSearch-Hits');
    for (const section of sections) {
        const sectionTitle = await section.$eval('div', el => el.innerHTML);
        // Get the `Docs` result section
        if (sectionTitle === 'Docs') {
            // Click on first result in `Docs` section
            const btn = await section.$('li');
            await btn.click();
            break;
        }
    }

    // Locate the title
    await page.waitForSelector('h1');
    // Print the title
    const title = await page.evaluate(_ => {
        const title = document.querySelector('h1').innerHTML;
        return Promise.resolve(title);
    });
    console.log(title);

    // Close the browser
    await browser.close();
})();