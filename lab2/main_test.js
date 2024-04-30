const fs = require("fs");
const test = require("node:test");
const assert = require("assert");

const testNameList = ["John", "Bob", "Tom", "Alan"];
test.mock.method(fs, "readFile", (_0, _1, callback) => {
    callback(undefined, testNameList.join("\n"));
});

const { Application, MailSystem } = require("./main");

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary

test("Test MailSystem write", () => {
    const mailSystem = new MailSystem();

    assert.strictEqual(mailSystem.write("'test'"), "Congrats, 'test'!");
    assert.strictEqual(mailSystem.write(100), "Congrats, 100!");
    assert.strictEqual(mailSystem.write(null), "Congrats, null!");
});

test("Test MailSystem send", (t) => {
    const mailSystem = new MailSystem();
    const name = "Tom";

    t.mock.method(Math, "random", () => 0.51);
    assert.strictEqual(mailSystem.send(name, "success"), true);

    t.mock.method(Math, "random", () => -100);
    assert.strictEqual(mailSystem.send(name, "fail"), false);
});

test("Test Application getNames", async () => {
    const app = new Application();
    const names = await app.getNames();

    assert.deepEqual(names, [testNameList, []]);
});

test("Test Application getRandomPerson", async (t) => {
    const app = new Application();
    const names = await app.getNames();

    for (let i = 0; i < 3; ++i) {
        t.mock.method(Math, "random", () => i / 4);
        assert.strictEqual(app.getRandomPerson(), testNameList[i]);
    }
});

test("Test Application selectNextPerson", async (t) => {
    const app = new Application();
    const names = await app.getNames();

    let nextPersonOffset = 0;
    t.mock.method(app, "getRandomPerson", function () {
        return this.people[Math.floor(nextPersonOffset++ / 2)];
    });

    for (let i = 0; i < testNameList.length; ++i) {
        assert.strictEqual(
            app.selectNextPerson(),
            testNameList[Math.floor(nextPersonOffset / 2)]
        );
    }

    assert.strictEqual(app.selectNextPerson(), null);
});

test("Test Application notifySelected", async (t) => {
    const testSelectList = [testNameList[0], testNameList[1]];
    const mockGetNames = async () => [testNameList, testSelectList];
    t.mock
        .method(Application.prototype, "getNames")
        .mock.mockImplementation(mockGetNames);

    const mockWrite = t.mock.fn(() => true);
    t.mock
        .method(MailSystem.prototype, "write")
        .mock.mockImplementation(mockWrite);

    const mockSend = test.mock.fn(() => true);
    t.mock
        .method(MailSystem.prototype, "send")
        .mock.mockImplementation(mockSend);

    const app = new Application();
    const names = await app.getNames();

    app.notifySelected();

    assert.strictEqual(mockSend.mock.calls.length, testSelectList.length);
});
