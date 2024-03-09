const test = require('node:test');
const assert = require('assert');
const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);
const { Application, MailSystem } = require('./main');

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary

test("Test MailSystem's write", () => {
    const ms = new MailSystem();
    const context = ms.write("Jerry");
    assert.strictEqual(context, "Congrats, Jerry!");
});

test("Test MailSystem's send", () => {
    const ms = new MailSystem();
    Math.random = () => 0.4;
    let context = ms.send("Jerry", "Test Message");
    assert.strictEqual(context, false);

    Math.random = () => 0.6;
    context = ms.send("Jerry", "Test Message");
    assert.strictEqual(context, true);
});

test("Test Application's getNames", async() => {
    const app = new Application();

    const fn_ = "name_list.txt";
    const data_ = "JJ\nEE\nRR\nYY";
    await writeFile(fn_, data_, "utf-8");

    let ctx = new Array([],[]);
    ctx = await app.getNames();
    assert.deepStrictEqual(ctx[0], ["JJ", "EE", "RR", "YY"]);
    assert.deepStrictEqual(ctx[1], []);
    fs.unlinkSync(fn_);
});

test("Test Application's getRandomPerson", async() => {
    const app = new Application();

    const fn_ = "name_list.txt";
    const data_ = "JJ\nEE\nRR\nYY";
    await writeFile(fn_, data_, "utf-8");

    let ctx = new Array([],[]);
    ctx = await app.getNames();
    assert.deepStrictEqual(ctx[0], ["JJ", "EE", "RR", "YY"]);
    assert.deepStrictEqual(ctx[1], []);

    Math.random = () => 0.3;
    let rdmPeople = app.getRandomPerson();
    assert.strictEqual(rdmPeople, "EE");

    Math.random = () => 0.99;
    rdmPeople = app.getRandomPerson();
    assert.strictEqual(rdmPeople, "YY");
    fs.unlinkSync(fn_);
});

test("Test Application's selectNextPerson", async() => {
    const app = new Application();

    const fn_ = "name_list.txt";
    const data_ = "JJ\nEE";
    await writeFile(fn_, data_, "utf-8");

    let ctx = new Array([],[]);
    ctx = await app.getNames();
    assert.deepStrictEqual(ctx[0], ["JJ", "EE"]);
    assert.deepStrictEqual(ctx[1], []);

    app.getRandomPerson = () => "JJ";
    let person = app.selectNextPerson();
    assert.strictEqual(person, "JJ");
    assert.deepStrictEqual(app.selected, ["JJ"]);

    app.getRandomPerson = () => "EE";
    person = app.selectNextPerson();
    assert.strictEqual(person, "EE");
    assert.deepStrictEqual(app.selected, ["JJ", "EE"]);

    person = app.selectNextPerson();
    assert.strictEqual(person, null);
    assert.deepStrictEqual(app.selected, ["JJ", "EE"]);

    fs.unlinkSync(fn_);
});

test("Test Application's notifySelected", async() => {
    const app = new Application();
    
    const fn_ = "name_list.txt";
    const data_ = "JJ\nEE";
    await writeFile(fn_, data_, "utf-8");

    let ctx = new Array([],[]);
    ctx = await app.getNames();
    assert.deepStrictEqual(ctx[0], ["JJ", "EE"]);
    assert.deepStrictEqual(ctx[1], []);

    app.getRandomPerson = () => "JJ";
    let person = app.selectNextPerson();
    assert.strictEqual(person, "JJ");
    assert.deepStrictEqual(app.selected, ["JJ"]);

    app.getRandomPerson = () => "EE";
    person = app.selectNextPerson();
    assert.strictEqual(person, "EE");
    assert.deepStrictEqual(app.selected, ["JJ", "EE"]);

    test.mock.method(app.mailSystem, 'write', (name) => "Congrats, "+name+"!");
    test.mock.method(app.mailSystem, 'send', () => true);

    app.notifySelected();

    assert.strictEqual(app.mailSystem.write.mock.calls.length, 2);
    assert.strictEqual(app.mailSystem.send.mock.calls.length, 2);

    let call = app.mailSystem.write.mock.calls[0];
    assert.deepStrictEqual(call.arguments, ["JJ"]);
    assert.deepStrictEqual(call.result, "Congrats, JJ!");
    assert.deepStrictEqual(call.error, undefined);

    call = app.mailSystem.write.mock.calls[1];
    assert.deepStrictEqual(call.arguments, ["EE"]);
    assert.deepStrictEqual(call.result, "Congrats, EE!");
    assert.deepStrictEqual(call.error, undefined);

    fs.unlinkSync(fn_);
});