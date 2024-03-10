const { test, mock } = require('node:test');
const assert = require('assert');
const fs = require('fs');

// stub file content
mock.method(fs, 'readFile', (fn, encoding, cb) => cb(null, "user1\nuser2\nuser3"));

const { Application, MailSystem } = require('./main');

test("Test Application getNames", async () => {
    let myApp = new Application();

    let names = await myApp.getNames();
    let peoples = names[0];
    let selected = names[1];
    assert.strictEqual(peoples.length, 3);
    assert.deepEqual(peoples, ["user1", "user2", "user3"]);
    assert.strictEqual(selected.length, 0);
});

test("Test Application getRandomPerson", (t) => {
    let myApp = new Application();
    // stub people
    myApp.people = ["user1", "user2", "user3", "user4"];

    t.mock.method(Math, 'random', () => 0.2);
    assert.strictEqual(myApp.getRandomPerson(), "user1");
    t.mock.method(Math, 'random', () => 0.4);
    assert.strictEqual(myApp.getRandomPerson(), "user2");
    t.mock.method(Math, 'random', () => 0.6);
    assert.strictEqual(myApp.getRandomPerson(), "user3");
    t.mock.method(Math, 'random', () => 0.8);
    assert.strictEqual(myApp.getRandomPerson(), "user4");
});

test("Test Application selectNextPerson", (t) => {
    let myApp = new Application();
    // stub people
    myApp.people = ["user1", "user2", "user3", "user4"];
    // stub selected
    myApp.selected = ["user1", "user2", "user3", "user4"];
    assert.strictEqual(myApp.selectNextPerson(), null);

    myApp.selected = ["user1", "user2"];
    let counter = 0;
    t.mock.method(myApp, 'getRandomPerson', () => {
        counter++;
        return (counter < 3) ? "user1" : "user4";
    });
    assert.strictEqual(myApp.selectNextPerson(), "user4");

    myApp.selected = ["user1", "user2"];
    t.mock.method(myApp, 'getRandomPerson', () => "user3");
    assert.strictEqual(myApp.selectNextPerson(), "user3");
});

test("Test Application notifySelected", () => {
    const namelist = ["user1", "user2", "user3", "user4"];

    class SpyMailSystem {
        write(name) {
            assert.ok(namelist.includes(name));
            return "write to " + name;
        }
        send(name, context) {
            assert.ok(namelist.includes(name));

            let contextArray = context.split(" ");
            assert.strictEqual(contextArray[0], "write");
            assert.strictEqual(contextArray[1], "to");
            assert.ok(namelist.includes(contextArray[2]));

            return "send to " + name + " with " + context;
        }
    };

    let myApp = new Application();
    myApp.mailSystem = new SpyMailSystem();
    myApp.people = namelist;
    myApp.selected = [];
    myApp.notifySelected();

    myApp.selected = ["user1", "user2"];
    myApp.notifySelected();
});

test("Test MailSystem write", (t) => {
    let myApp = new Application();
    myApp.selected = ["user1", "user2", "user3", "user4"];

    // mock
    t.mock.method(myApp, 'notifySelected', () => {
        for (const x of myApp.selected) {
            const context = myApp.mailSystem.write(x);
            assert.strictEqual(context, "Congrats, " + x + "!");
        }
    });

    myApp.notifySelected();
});

test("Test MailSystem send", (t) => {
    let myMail = new MailSystem();
    let dummy = "老鼠愛 dummy";

    t.mock.method(Math, 'random', () => 0.2);
    assert.strictEqual(myMail.send("user1", dummy), false);

    t.mock.method(Math, 'random', () => 0.8);
    assert.strictEqual(myMail.send("user1", dummy), true);
});