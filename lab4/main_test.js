"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Launch the browser and open a new blank page
    const browser = yield puppeteer_1.default.launch();
    const page = yield browser.newPage();
    yield page.setViewport({ width: 1080, height: 1024 });
    // Navigate the page to a URL
    yield page.goto('https://pptr.dev/');
    // Click search button
    const searchBox = yield page.waitForSelector(".DocSearch-Button");
    yield (searchBox === null || searchBox === void 0 ? void 0 : searchBox.click());
    // Type into search box
    const searchInput = yield page.waitForSelector("#docsearch-input");
    yield page.type("#docsearch-input", "chipi chipi chapa chapa", { delay: 100 });
    // Get the `Docs` result section
    const searchDocResult = yield page.waitForSelector("li#docsearch-item-5");
    yield (searchDocResult === null || searchDocResult === void 0 ? void 0 : searchDocResult.click());
    // Locate the title
    const h1Element = yield page.waitForSelector("h1");
    // Print the title
    console.log(yield page.evaluate(el => el === null || el === void 0 ? void 0 : el.textContent, h1Element));
    // Close the browser
    yield browser.close();
}))();
