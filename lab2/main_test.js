const test = require('node:test');
const assert = require('assert');
const fs = require('fs');
// Stub Failed: Leave Application.people empty
test.mock.method(fs, 'readFile', (a, b) =>'Amy\nBenson\nCharlie');
// test.mock.method(util, 'promisify', (a) => a);
const { Application, MailSystem } = require('./main');

// Alternative of Stub: Write File
/*
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
*/

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary

test("Test MailSystem's write", () => {
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
    // 2. Asume that Math.random() works, check if the function provide a valid output
    t.mock.method(Math, "random", () => 1.0);
    for(let i = 0; i < 5; i++) {
        assert.strictEqual(mailSys.send("testing", "random test"), true);
    }
    t.mock.method(Math, "random", () => 0.0);
    for(let i = 0; i < 5; i++) {
        assert.strictEqual(mailSys.send("testing", "random test"), false);
    }
});

test("Test Application's getNames", (t) => {
});

test("Test Application's getRandomPerson", (t) => {
});

test("Test Application's selectNextPerson", (t) => {
});

test("Test Application's notifySelected", (t) => {
});