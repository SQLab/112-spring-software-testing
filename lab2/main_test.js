const test = require("node:test");
const assert = require("assert");

const fs = require("fs")

const name = ["John", "Jane", "Doe", "Smith"];
let name_list_txt = "";
for(let i = 0; i < name.length; i++) {
    name_list_txt += name[i];
    if(i != name.length - 1) {
        name_list_txt += "\n"
    }
}

test.mock.method(fs, "readFile", (path, options, callback) => callback(null, name_list_txt));


const { Application, MailSystem } = require("./main");

test("Test MailSystem's write", () => {
    const ms = new MailSystem();
    for(let i = 0; i < name.length; i++) {
        assert.strictEqual(ms.write(name[i]),"Congrats, " + name[i] + "!");
    }
});

test("Test MailSystem's send", () => {
    const ms = new MailSystem();
    
    // success
    test.mock.method(Math, "random", () => 0.6);
    for(let i = 0; i < name.length; i++) {
        assert.strictEqual(ms.send(name[i]), true);
    }

    // not success
    test.mock.method(Math, "random", () => 0.4);
    for(let i = 0; i < name.length; i++) {
        assert.strictEqual(ms.send(name[i]), false);
    }
});

test("Test Application's getNames", async () => {
    const app = new Application();
    const [people, selected] = await app.getNames();
    assert.deepStrictEqual(people, name);
    assert.deepStrictEqual(selected, []);
});

test("Test Application's getRandomPerson", () => {
    const app = new Application();
    app.people = name;
    test.mock.method(Math, "random", () => 0.2);
    assert.strictEqual(app.getRandomPerson(), name[0]);
    test.mock.method(Math, "random", () => 0.6);
    assert.strictEqual(app.getRandomPerson(), name[2]);
});

test("Test Application's selectNextPerson", () => {
    const app = new Application();
    app.people = name;
    app.selected = name;
    assert.strictEqual(app.selectNextPerson(), null);
    
    // test someone reapeats at least 10 times
    const mock_random = test.mock.fn(() => 0.6);
    test.mock.method(Math, 'random', () => {
        if (mock_random.mock.calls.length < 10) {
            return mock_random();
        }
        return 0.2;
    });

    app.selected = [];
    assert.strictEqual(app.selectNextPerson(), name[2]);
    assert.strictEqual(app.selectNextPerson(), name[0]);
});

test("Test Application's notifySelected", () => {
    const app = new Application();
    app.people = name;
    app.selected = name;
    app.mailSystem.write = test.mock.fn(app.mailSystem.write);
    app.mailSystem.send = test.mock.fn(app.mailSystem.send);
    app.notifySelected();
    assert.strictEqual(app.mailSystem.write.mock.calls.length, name.length);
    assert.strictEqual(app.mailSystem.send.mock.calls.length, name.length);
});


