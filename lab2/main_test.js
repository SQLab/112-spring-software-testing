const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary

const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);

test("Test MailSystem's write", () => {
    const system = new MailSystem();
    const context = system.write('Kelvin');
    assert.strictEqual(context, 'Congrats, Kelvin!');
});

test("Test MailSystem's send", () => {
    const system = new MailSystem();
    const MathRandom = Math.random;
    Math.random = () => 0.7;
    const result = system.send('Kelvin', 'hi');
    assert.strictEqual(result, true);

    Math.random = () => 0.4;
    const result2 = system.send('Kelvin', 'hi');
    assert.strictEqual(result2, false);
    Math.random = MathRandom;
});

test('test getNames', async() =>{
    const name_list = 'Kelvin\nNeil\n088\nJyw\nwei';
    await writeFile('name_list.txt', name_list, 'utf-8');
    const app = new Application();
    const [people, selected] = await app.getNames();

    assert.deepStrictEqual(people, ['Kelvin','Neil','088','Jyw','wei']);
    assert.deepStrictEqual(selected, []);
});


test('test getRandomPerson', async() =>{
    const name_list = 'Kelvin\nNeil\n088\nJyw\nwei';
    await writeFile('name_list.txt', name_list, 'utf-8');
    const app = new Application();
    const [people, selected] = await app.getNames();

    for(var i=0; i<app.people.length; i++){
        person = app.getRandomPerson();
        assert(people.includes(person));
    }
});

test('test selectNextPerson', async(t) => {
    const names = 'Kelvin\n088';
    await writeFile('name_list.txt', names, 'utf-8');
    const application = new Application();
    const [allPeople, currentlySelected] = await application.getNames();
    
    let selectionCounter = 0;
    application.getRandomPerson = () => {
        selectionCounter++;
        return selectionCounter % 2 ? 'Kelvin' : '088';
    }

    let selectedPerson = application.selectNextPerson();
    assert.strictEqual(selectedPerson, 'Kelvin');
    assert.deepStrictEqual(application.selected[0], 'Kelvin');

    selectionCounter = 0;
    selectedPerson = application.selectNextPerson();
    assert.strictEqual(selectedPerson, '088');
    assert.deepStrictEqual(application.selected[1], '088');

    selectedPerson = application.selectNextPerson();
    assert.strictEqual(selectedPerson, null);
});

test('test notifySelected', async() => {
    // Prepare a list of names in a file
    const namesContent = 'Kelvin';
    await writeFile('name_list.txt', namesContent, 'utf-8');
    
    // Initialize the application and the mock mail system
    const application = new Application();
    const mailSystemSpy = {
        writeCalls: [],
        sendCalls: [],
        write: function(name) {
            this.writeCalls.push(name);
        },
        send: function(name) {
            this.sendCalls.push(name);
        }
    };
    application.mailSystem = mailSystemSpy;
    
    // Load names into the application and select a person
    await application.getNames();
    Math.random = () => 0.1; // Ensure that 'John' is selected
    application.selectNextPerson();
    
    // Notify the selected person and check if mail system methods were called
    application.notifySelected();
    assert.strictEqual(mailSystemSpy.writeCalls.length, 1, 'Write method should be called once');
    assert.strictEqual(mailSystemSpy.sendCalls.length, 1, 'Send method should be called once');
    assert.strictEqual(mailSystemSpy.writeCalls[0], 'Kelvin', 'Write method should be called with John');
    assert.strictEqual(mailSystemSpy.sendCalls[0], 'Kelvin', 'Send method should be called with John');

    // Clean up the test environment
    fs.unlinkSync('name_list.txt');
});

class MailSystemMock {
    constructor() {
        this.writeCalls = [];
        this.sendCalls = [];
    }
    write(name) {
        this.writeCalls.push(name);

    }
    send(name, context) {
        this.sendCalls.push({name, context});

    }
} 