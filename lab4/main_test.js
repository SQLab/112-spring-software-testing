const puppeteer = require("puppeteer");

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto("https://pptr.dev/");

  // Click search button
  await page.click(".DocSearch-Button-Placeholder");

  // Type into search box
  const input = "#docsearch-input";
  await page.waitForSelector(input);
  await page.type(input, "chipi chipi chapa chapa");

  // Wait for search result
  // Get the `Docs` result section
  const searchResultSelector = "#docsearch-item-5";
  await page.waitForSelector(searchResultSelector);

  // Click on first result in `Docs` section
  await page.click(searchResultSelector);

  // Locate the title
  const textSelector = await page.waitForSelector(
    "text/Experimental WebDriver BiDi support"
  );
  const fulltitle = await textSelector?.evaluate((el) => el.textContent);

  // Print the title
  console.log(fulltitle);

  // Close the browser
  await browser.close();
})();
