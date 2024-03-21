const puppeteer = require("puppeteer");

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto("https://pptr.dev/");

  // Hints:
  // Click search button
  const searchButtonSelector = "button.DocSearch.DocSearch-Button";
  const searchButton = await page.waitForSelector(searchButtonSelector);
  await searchButton.click();
  
  // Type into search box
  const searchBoxSelector = "input.DocSearch-Input";
  const searchBox = await page.waitForSelector(searchBoxSelector);
  await searchBox.focus();
  await searchBox.type("chipi chipi chapa chapa", { delay: 500 });

  // Wait for search result
  // Get the `Docs` result section
  // Click on first result in `Docs` section
  const docHit = await page.waitForSelector("#docsearch-item-5 a");
  await docHit.click();

  // Locate the title
  const titleElement = await page.waitForSelector(".theme-doc-markdown.markdown h1");
  // Print the title
  const title = await titleElement.evaluate(el => el.textContent);
  console.log(title);

  // Close the browser
  await browser.close();
})();