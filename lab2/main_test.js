const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');
const fs = require('fs');
const path = require('path');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);
const unlink = util.promisify(fs.unlink);

test("Test Mail System's write", () => {

    const mailSystem = new MailSystem();
    const context = mailSystem.write('Hong');
    assert.strictEqual(context, 'Congrats, Hong!');
});

test("Test Mail System's send", () => {

    const mailSystem = new MailSystem();
    const orgRandom = Math.random;
    Math.random = () => 0.6;
    const success = mailSystem.send('Hong', 'Congrats, Hong!');
    assert.strictEqual(success, true);
    Math.random = () => 0.4;
    const fail = mailSystem.send('Hong', 'Congrats, Hong!');
    assert.strictEqual(fail, false);
    Math.random = orgRandom;
});

//因為需要等待getNames(異步函數async)所以需要用await等待結果，因此這裡需要用async
test("Test Application's getNames", async() => {
    const mockData = 'Hong\nAlbert\nIan';
    const filePath = path.join(__dirname, 'name_list.txt');

    // Write the mock data to a file
    await writeFile(filePath, mockData);

    try {
        const app = new Application();
        const [names, selected] = await app.getNames();

        assert.deepStrictEqual(names, ['Hong', 'Albert', 'Ian']);
        assert.deepStrictEqual(selected, []);
    } finally {
        // Delete the file
        await unlink(filePath);
    }
});

test("Test Application's getRandomPerson", async() => {
    const mockData = 'Hong\nAlbert\nIan';
    const filePath = path.join(__dirname, 'name_list.txt');
    const orgRandom = Math.random;
    // Write the mock data to a file
    await writeFile(filePath, mockData);

    try {
        const app = new Application();
        const [names, selected] = await app.getNames();

        assert.deepStrictEqual(names, ['Hong', 'Albert', 'Ian']);
        assert.deepStrictEqual(selected, []);

        Math.random = () => 0.1;
        var person = app.getRandomPerson();
        assert.strictEqual(person, 'Hong');

        Math.random = () => 0.5;
        var person = app.getRandomPerson();
        assert.strictEqual(person, 'Albert');

        Math.random = () => 0.9;
        var person = app.getRandomPerson();
        assert.strictEqual(person, 'Ian');
        
    } finally {
        // Delete the file
        Math.random = orgRandom;
        await unlink(filePath);
    }
});
test("Test Application's selectNextPerson", async() => {
    const mockData = 'Hong\nAlbert\nIan';
    const filePath = path.join(__dirname, 'name_list.txt');
    await writeFile(filePath, mockData);

    try {
        let app = new Application();
        let [names, selected] = await app.getNames();

        assert.deepStrictEqual(names, ['Hong', 'Albert', 'Ian']);
        assert.deepStrictEqual(selected, []);
        const orgGetRandomPerson = app.getRandomPerson;
        app.getRandomPerson = () => 'Hong';
        var person = app.selectNextPerson();
        assert.strictEqual(person, 'Hong');
        assert.deepStrictEqual(app.selected, ['Hong']);

        app.getRandomPerson = () => 'Albert';
        person = app.selectNextPerson();
        assert.strictEqual(person, 'Albert');
        assert.deepStrictEqual(app.selected, ['Hong', 'Albert']);

        app.getRandomPerson = () => 'Ian';
        person = app.selectNextPerson();
        assert.strictEqual(person, 'Ian');
        assert.deepStrictEqual(app.selected, ['Hong', 'Albert', 'Ian']);

        //確認name的lenth == selected的lenth
        app.getRandomPerson = orgGetRandomPerson;
        assert.strictEqual(app.people.length, app.selected.length);
        assert.strictEqual(app.selectNextPerson(), null);
        
        
        //測試while情況
        let cnt = 0;
        app.getRandomPerson = () => {
            
            if (cnt % 3 === 0) {
                cnt++;
                return 'Hong';
            } else if (cnt % 3 === 1){
                cnt++;
                return 'Albert';
            } else {
                return 'Ian';
            }
            
        };
        app.selected = ['Hong', 'Albert'];
        assert.strictEqual(app.selectNextPerson(), 'Ian');
        assert.deepStrictEqual(app.selected, ['Hong', 'Albert', 'Ian']); 
        
    } finally {
        // Delete the file
        await unlink(filePath);
    }
});

test("Test Application's notifySelected", async () => {
    const mockData = 'Hong\nAlbert';
    const filePath = path.join(__dirname, 'name_list.txt');
    await writeFile(filePath, mockData);
    try {
        let app = new Application();
        let [names, selected] = await app.getNames();

        assert.deepStrictEqual(names, ['Hong', 'Albert']);
        assert.deepStrictEqual(selected, []);
        const orgGetRandomPerson = app.getRandomPerson;
        app.getRandomPerson = () => 'Hong';
        var person = app.selectNextPerson();
        assert.strictEqual(person, 'Hong');
        assert.deepStrictEqual(app.selected, ['Hong']);

        app.getRandomPerson = () => 'Albert';
        person = app.selectNextPerson();
        assert.strictEqual(person, 'Albert');
        assert.deepStrictEqual(app.selected, ['Hong', 'Albert']);

        test.mock.method(app.mailSystem, 'write', (name) => "Congrats, " + name + "!");
        test.mock.method(app.mailSystem, 'send', () => true);
        app.notifySelected();
        assert.strictEqual(app.mailSystem.write.mock.calls.length, 2);
        assert.strictEqual(app.mailSystem.send.mock.calls.length, 2);

        let call = app.mailSystem.write.mock.calls[0];
        assert.deepStrictEqual(call.arguments, ["Hong"]);
        assert.deepStrictEqual(call.result, "Congrats, Hong!");
        assert.deepStrictEqual(call.error, undefined);

        call = app.mailSystem.write.mock.calls[1];
        assert.deepStrictEqual(call.arguments, ["Albert"]);
        assert.deepStrictEqual(call.result, "Congrats, Albert!");
        assert.deepStrictEqual(call.error, undefined);
        app.getRandomPerson = orgGetRandomPerson;
    } finally {
        await unlink(filePath);
    }
});