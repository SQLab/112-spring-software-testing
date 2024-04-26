const test = require('node:test');
const assert = require('assert');
const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);
const { Application, MailSystem } = require('./main');
const path = require('node:path'); 

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary

test("Test MailSystem's write", () => {
    const ms = new MailSystem();
    const context = ms.write("Jerry");
    assert.strictEqual(context, "Congrats, Jerry!");
});

test("Test MailSystem's send", () => {
    const ms = new MailSystem();
    const orgrdm = Math.random;
    Math.random = () => 0.4;
    let context = ms.send("Jerry", "Test Message");
    assert.strictEqual(context, false);

    Math.random = () => 0.6;
    context = ms.send("Jerry", "Test Message");
    assert.strictEqual(context, true);

    Math.random = orgrdm;
});

test("Test Application's getNames", async () => {
    const fn_ = path.join(process.cwd(), 'name_list.txt');
    const data_ = "JJ\nEE\nRR\nYY";
    await writeFile(fn_, data_, "utf-8");
    
    const app = new Application();

    let ctx = new Array([],[]);
    ctx = await app.getNames();
    assert.deepStrictEqual(ctx[0], ["JJ", "EE", "RR", "YY"]);
    assert.deepStrictEqual(ctx[1], []);
    
    fs.unlinkSync(fn_);
});

test("Test Application's getRandomPerson", async () => {
    const fn_ = path.join(process.cwd(), 'name_list.txt');
    const data_ = "JJ\nEE";
    await writeFile(fn_, data_, "utf-8");

    const app = new Application();

    let ctx = new Array([],[]);
    ctx = await app.getNames();
    assert.deepStrictEqual(ctx[0], ["JJ", "EE"]);
    assert.deepStrictEqual(ctx[1], []);

    // Math.random = () => 0.3;
    let rdmPeople = await app.getRandomPerson();
    assert.ok(app.people.includes(rdmPeople));
    // assert.strictEqual(rdmPeople, "JJ");

    // Math.random = () => 0.6;
    rdmPeople = await app.getRandomPerson();
    assert.ok(app.people.includes(rdmPeople));
    // assert.strictEqual(rdmPeople, "EE");

    fs.unlinkSync(fn_);
});

test("Test Application's selectNextPerson", async () => {
    const fn_ = path.join(process.cwd(), 'name_list.txt');
    const data_ = "JJ\nEE";
    await writeFile(fn_, data_, "utf-8");

    const app = new Application();

    let ctx = new Array([],[]);
    ctx = await app.getNames();
    assert.deepStrictEqual(ctx[0], ["JJ", "EE"]);
    assert.deepStrictEqual(ctx[1], []);

    const orgsnp = app.getRandomPerson;

    app.getRandomPerson = () => "JJ";
    let rdperson = app.selectNextPerson();
    assert.strictEqual(rdperson, "JJ");
    assert.ok(app.people.includes(rdperson));
    assert.ok(app.selected.includes(rdperson));
    assert.deepStrictEqual(app.selected, ["JJ"]);
    assert.strictEqual(app.selected.length, 1);

    app.getRandomPerson = () => "EE";
    rdperson = app.selectNextPerson();
    assert.strictEqual(rdperson, "EE");
    assert.ok(app.people.includes(rdperson));
    assert.ok(app.selected.includes(rdperson));
    assert.deepStrictEqual(app.selected, ["JJ","EE"]);
    assert.strictEqual(app.selected.length, 2);

    app.getRandomPerson = orgsnp;
    rdperson = app.selectNextPerson();
    assert.strictEqual(rdperson, null);
    assert.strictEqual(rdperson, null);
    assert.strictEqual(app.selected.length, 2);

    let cnt = 0;
    app.getRandomPerson = () => {
        if (cnt++ % 2 === 0) {
            return 'JJ';
        } else {
            return 'EE';
        }
    }
    app.selected = ['JJ'];
    rdperson = app.selectNextPerson();
    assert.strictEqual(rdperson, 'EE');
    assert.deepStrictEqual(app.selected, ['JJ', 'EE']);
    
    fs.unlinkSync(fn_);
});

test("Test Application's notifySelected", async () => {
    
    const fn_ = 'name_list.txt';
    const data_ = "JJ\nEE";
    await writeFile(fn_, data_, "utf-8");

    const app = new Application();

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

    test.mock.method(app.mailSystem, 'write', (name) => "Congrats, " + name + "!");
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