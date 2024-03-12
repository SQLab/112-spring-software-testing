const test = require('node:test');
const assert = require('assert');
const fs = require('fs');
// Stub Failed: Leave Application.people empty
// test.mock.method(fs, 'readFile', (a, b) =>'Amy\nBenson\nCharlie');
// test.mock.method(util, 'promisify', (a) => a);
const { Application, MailSystem } = require('./main');

// Alternative
function init_test(testcase) {
    if (!testcase instanceof Array) {
        return -1;
    }
    text = testcase.toString().replace(/,/g, "\n");
    try {
        fs.writeFileSync("name_list.txt", text, "utf-8");
    } catch (error) {
        console.log(error);
        return -1;
    }
    return 0;
}

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary

test("Test MailSystem's write", (t) => {
});

test("Test MailSystem's send", (t) => {
});

test("Test Application's getNames", (t) => {
});

test("Test Application's getRandomPerson", (t) => {
});

test("Test Application's selectNextPerson", (t) => {
});

test("Test Application's notifySelected", (t) => {
});