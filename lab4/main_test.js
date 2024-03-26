const puppeteer = require("puppeteer");

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto("https://pptr.dev/");

  // Hints:
  // Click search button
  // Type into search box
  // Wait for search result
  // Get the `Docs` result section
  // Click on first result in `Docs` section
  // Locate the title
  // Print the title

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  // Type into search box
  await page.click("button.DocSearch");
  await page.waitForSelector("input.DocSearch-Input");
  await page.type("input.DocSearch-Input", "chipi chipi chapa chapa");
  await page.waitForSelector(
    'li.DocSearch-Hit > a[href="/webdriver-bidi/#measuring-progress"]'
  );

  // wait for navigation after clicking
  await Promise.all([
    page.waitForNavigation(),
    page.click(
      'li.DocSearch-Hit > a[href="/webdriver-bidi/#measuring-progress"]'
    ),
  ]);

  await page.waitForSelector("div.theme-doc-markdown h1");
  elementHTML = await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    return element ? element.innerHTML : null;
  }, "div.theme-doc-markdown h1");

  console.log(elementHTML);

  // Close the browser
  await browser.close();
})();