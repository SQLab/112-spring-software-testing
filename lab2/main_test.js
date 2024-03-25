const {mock, test} = require('node:test');
const assert = require('assert');
const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const { Application, MailSystem } = require('./main');

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary

test("Mail System write", () => {
    const m = new MailSystem();
    const text = 'test';
    const ret = m.write(text);
    assert.strictEqual(ret, 'Congrats, ' + text + '!');
});

test("Mail System send", () => {
    const m = new MailSystem();
    const text = 'test';
    
    // use a "Mock" math.random
    const originalRandom = Math.random;
    Math.random = () => 0.6; // use a mock random function
    let ret = m.send(text, null);
    assert.strictEqual(ret, true);

    Math.random = () => 0.4; // use a mock random function
    ret = m.send(text, null);
    assert.strictEqual(ret, false);

    Math.random = originalRandom; // restore original random function
});

//------------------- Test Application ---------------------



test("Application", async () => {
    //Use "Stub" to privide a tested input
    const testedData = "Ian\nSamuel\nMichael\nJane";
    await writeFile('name_list.txt', testedData, 'utf8');

    const app = new Application();
    const ret = await app.getNames();
    expectedRet = [['Ian', 'Samuel', 'Michael', 'Jane'], []];
    assert.deepStrictEqual(ret, expectedRet);
    console.log("app.people", app.people);
    // cleanup
    fs.unlinkSync('name_list.txt');

    //--------- Test the getRandomPerson function ------------
    randomPerson = await app.getRandomPerson();
    // console.log("randomPerson=", randomPerson);
    // console.log("app.people=", app.people);
    assert.ok(app.people.includes(randomPerson));

    // --------- Test the selectNextPerson function ------------
    for (let i = 0; i < app.people.length; i++) {
        let selectedPerson = app.selectNextPerson();
        // console.log("selectedPerson=", selectedPerson);
        assert.ok(app.people.includes(selectedPerson));
        assert.deepStrictEqual(app.selected.length, i+1);
    }
    this.selected = ['Ian', 'Samuel', 'Michael', 'Jane'];
    let selectedPerson = app.selectNextPerson();
    assert.strictEqual(selectedPerson, null); // all selected condition

    // --------- Test the notifySelected function ------------
    this.selected = ['Ian', 'Samuel', 'Michael', 'Jane'];
    // create spy for mailSystem.write & send
    const spyMailSys = {
        write: mock.fn(() => {}),
        send: mock.fn(() => {})
    }
    app.mailSystem = spyMailSys;
    app.notifySelected();

    //Assure the write & send functions are called  times = app.selected.length
    assert.strictEqual(app.mailSystem.write.mock.callCount(), app.selected.length);
    assert.strictEqual(app.mailSystem.send.mock.callCount(), app.selected.length);

    assert.deepStrictEqual(app.mailSystem.write.mock.calls.map(call => call.arguments[0]), app.selected);
    assert.deepStrictEqual(app.mailSystem.send.mock.calls.map(call => call.arguments[0]), app.selected);
});

