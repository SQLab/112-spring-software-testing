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
    const mailSys = new MailSystem();
    // 1. test return type
    assert.strictEqual(typeof mailSys.write("Amy"), "string");
    // 2. validate legality of context returned
    assert.strictEqual(mailSys.write("Amy"), "Congrats, Amy!");
});

test("Test MailSystem's send", (t) => {
    const mailSys = new MailSystem();
    // 1. test return type
    assert.strictEqual(typeof mailSys.send("testing", "random test"), "boolean");
    var success = false, failure = false;
    for(let i = 0; i < 10; i++) {
        if (mailSys.send("testing", "random test")) {
            success = true;
        } else {
            failure = true;
        }
    }
    // 2. check if the sys
    assert(success && failure);
});

test("Test Application's getNames", (t) => {
});

test("Test Application's getRandomPerson", (t) => {
});

test("Test Application's selectNextPerson", (t) => {
});

test("Test Application's notifySelected", (t) => {
});