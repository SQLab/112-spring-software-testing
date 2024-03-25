const {setTimeout} = require('node:timers/promises');
const puppeteer = require("puppeteer");

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false });
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
  const buttonSelector = "button.DocSearch.DocSearch-Button";
  await page.waitForSelector(buttonSelector);
  await page.click(buttonSelector);

  const inputSelector = "#docsearch-input";
  await page.waitForSelector(inputSelector);
  await page.type(inputSelector, "chipi chipi chapa chapa");
  await page.waitForSelector(".DocSearch-Hits");

  await page.waitForSelector(".DocSearch-Dropdown-Container", {
    visible: true,
  });

    await setTimeout(1000)

  const linkToClick = await page.evaluate(() => {
    // Find all sections
    const sections = Array.from(
      document.querySelectorAll("section.DocSearch-Hits"),
    );
    for (const section of sections) {
      // Check if this section's source is "Docs"
      const source = section.querySelector(".DocSearch-Hit-source");
      if (source && source.textContent === "Docs") {
        // Find the first link in this section
        const firstLink = section.querySelector("a");
        if (firstLink) {
          return firstLink.href; // Return the href of the first link
        }
      }
    }
    return null; // Return null if no link found
  });

  if (linkToClick) {
    // Use page.goto to navigate if a link was found
    await page.goto(linkToClick);
  } else {
    console.log('No link found in the "Docs" section.');
  }

  await setTimeout(1000)

  const h1Text = await page.evaluate(() => {
    const h1 = document.querySelector(".theme-doc-markdown.markdown h1");
    return h1 ? h1.innerText : "H1 element not found";
  });

  console.log(h1Text);

  // Close the browser
  await browser.close();
})();
