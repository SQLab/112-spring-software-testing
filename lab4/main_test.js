const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Hints:
    // Click search button
    const search_button_selector = '.DocSearch-Button';    
    await page.waitForSelector(search_button_selector);

    // Click the search button
    await page.click(search_button_selector);
    
    // Type into search box
    const search_box_selector = '.DocSearch-Input';
    await page.waitForSelector(search_box_selector);
    
    // Wait for search result
    await page.type(search_box_selector, 'chipi chipi chapa chapa' , { delay: 666 });


    // Get the `Docs` result section
    const search_doc_selector = '#docsearch-item-5';
    await page.waitForSelector(search_doc_selector);
    
    // Click on first result in `Docs` section
    await page.click(search_doc_selector);

    // Locate the title
    const text_selector = await page.waitForSelector('.theme-doc-markdown.markdown h1');
    
    // Get the text content of the h1 element
    const title_content = await page.evaluate(text_selector => text_selector.textContent, text_selector);


    // Print the title
    console.log(title_content);
    // Close the browser
    await browser.close();
})();