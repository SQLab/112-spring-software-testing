const {test, mock} = require('node:test');
const fs = require('fs');
const util = require('util');
const assert = require('assert');
const { Application, MailSystem } = require('./main');

// const fs = require('fs');
const filePath = 'name_list.txt';
// const content = 'Quan\nHenry\nBilly';

 function writeFile(content) {
     return new Promise((resolve) => {
         fs.writeFile(filePath, content, resolve);
     });
 }

 function unlink() {
     return new Promise((resolve) => {
         fs.unlink(filePath, resolve);
     });
 }

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary

// const unlink = util.promisify(fs.unlink);
// const writeFile = util.promisify(fs.writeFile);

test('should write a mail for a given name', () => {
    const mailSystem = new MailSystem();
    const name = 'John';
    const res = mailSystem.write(name);
    assert.strictEqual(res, 'Congrats, John!');
})

test('send email to a given name', (context) => {
    const mailSystem = new MailSystem();
    const name = 'John';

    mock.method(Math, 'random', () => 0.6);
    const success = mailSystem.send(name, context);
    assert.strictEqual(success, true);

    mock.method(Math, 'random', () => 0.4);
    const failure = mailSystem.send(name, context);
    assert.strictEqual(failure, false);

})


test('create Application instance', async (t) => {
    
   
    const fun = t.mock.fn(writeFile);
    await fun('Quan\nHenry\nBilly');
    
    const app = new Application();

    const res = await app.getNames();
    assert.deepStrictEqual(app.people.length, 3);
    assert.deepStrictEqual(app.selected.length, 0);
    assert.deepStrictEqual(res, [['Quan', 'Henry', 'Billy'], []]);
    assert.deepStrictEqual(app.people, ['Quan', 'Henry', 'Billy']);
    assert.deepStrictEqual(app.selected, []);

    // fs.unlinkSync(fileName);   
    await unlink();

})

test('get random person', async (t) => {
    const fn = t.mock.fn(writeFile);
    await fn('Quan\nHenry\nBilly');
    // await writeFile(fileName, content, 'utf8');

    const app = new Application();
    const [people, selected] = await app.getNames()
    
    mock.method(Math, 'random', () => 0.5);
    const index = Math.floor(0.5 * people.length)
    const person = app.getRandomPerson();
    // console.log(person);

    assert.strictEqual(person, people[index])
    await unlink();
 

})



test('notify selected', async (t) => {
    // const content = 'Quan\nHenry\nBilly';
    // const fileName = 'name_list.txt';
    // await writeFile(fileName, content, 'utf8');

    const fun = t.mock.fn(writeFile);
    await fun('Quan\nHenry\nBilly');

    const app = new Application();

    const write = mock.method(app.mailSystem, 'write');
    const send = mock.method(app.mailSystem, 'send');

    app.selected = ['Quan', 'Henry', 'Billy'];
    app.notifySelected();
    assert.deepStrictEqual(write.mock.calls.length, 3);
    assert.deepStrictEqual(send.mock.calls.length, 3);
    await unlink();

})

test('select next person', async (t) => {
    const content = 'Quan\nHenry\nBilly';


    const fn = t.mock.fn(writeFile);
    await fn(content);

    const app = new Application();
    const [people, selected] = await app.getNames()

    const getFn = mock.method(app, 'getRandomPerson');


    // all people are selected
    app.selected = people;
    const res = app.selectNextPerson();
    assert.strictEqual(res, null);

    // select a person
    // already selected Quan
    // Make the first call return Quan
    // Make the second call return Henry
    app.selected = ['Quan'];
    getFn.mock.mockImplementation(() => 'Henry');
    getFn.mock.mockImplementationOnce(() => 'Quan');
    const person = app.selectNextPerson();
    assert.strictEqual(person, 'Henry');
    assert.deepStrictEqual(app.selected.length, 2);
    await unlink();
    
    // fs.unlinkSync(fileName);   
})