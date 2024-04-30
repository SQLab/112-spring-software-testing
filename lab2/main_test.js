const test = require('node:test');
const assert = require('assert');
const fs = require('fs');
const { resolve } = require('path');
function waitFor(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
test.mock.method(fs, 'readFile',async (path,encoding,callback)=>{callback(0,'Alice\nBob\nCharlie')});
const { Application, MailSystem } = require('./main');
test('Test MailSystem write', () => {
    const testmail = new MailSystem();
    assert.deepStrictEqual(testmail.write('Alice'), 'Congrats, ' + 'Alice' + '!');
});
test('Test MailSystem send', () => {
    const testmail = new MailSystem();
    test.mock.method(Math,'random',() => true);
    assert.deepStrictEqual(testmail.send('Alice', 'success'), true);
    test.mock.method(Math,'random',() => false);
    assert.deepStrictEqual(testmail.send('Alice', 'fail'), false);
});

test('Test Application constructor', async () => {
    const Appct = new Application();
    await waitFor(100);
    assert.deepStrictEqual(Appct.people, ['Alice','Bob','Charlie']);
    assert.deepStrictEqual(Appct.selected, []);
});

test('Test Application getNames', async () => {
    const Appct = new Application();
    const [names,selected] = await Appct.getNames();
    assert.deepStrictEqual(names, ['Alice','Bob','Charlie']);
    assert.deepStrictEqual(selected, []);
});

test('Test Application getRandomPerson', async () => {
    const Appct = new Application();
    await waitFor(100);
    test.mock.method(Math,'random',() => 0);
    assert.deepStrictEqual(Appct.getRandomPerson(), Appct.people[0]);
});

test('Test Application selectNextPerson', async () => {
    const Appct = new Application();
    await waitFor(100);
    let i = 0;
    test.mock.method(Appct, 'getRandomPerson', ()=>{return Appct.people[i++]});
    assert.deepStrictEqual(Appct.selectNextPerson(), Appct.people[0]);
    i = 0;
    assert.deepStrictEqual(Appct.selectNextPerson(), Appct.people[1]);
    Appct.selected = [0, 0, 0];
    assert.deepStrictEqual(Appct.selectNextPerson(), null);
});

test('Test Application notifySelected()', async () => {
    const Appct = new Application();
    await waitFor(100);
    Appct.selected = ['Alice'];
    assert.deepStrictEqual(Appct.notifySelected(), undefined);
});