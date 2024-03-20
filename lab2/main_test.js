const test = require('node:test');
const assert = require('assert');

const fs = require('fs');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);

const { Application, MailSystem } = require('./main');


test("Test MailSystem's write function", () => {
    const mailSystem = new MailSystem();
    const context = mailSystem.write('OuO');
    assert.strictEqual(context, 'Congrats, OuO!');
});

test("Test MailSystem's send sucess", () => {
    const mailSystem = new MailSystem();

    // Do stub on Math.random to always return a value > 0.5
    const MathRandomFunction = Math.random;
    Math.random = () => 0.51;
    const result = mailSystem.send('OuO', 'Hello World!');
    assert.strictEqual(result, true);

    // Recover the original Math.random function
    Math.random = MathRandomFunction;
});

test("Test MailSystem's send failure", () => {
    const mailSystem = new MailSystem();

    // Do stub on Math.random to always return a 
    const MathRandomFunction = Math.random;
    Math.random = () => 0.5;
    const result = mailSystem.send('OwO', 'Goodbye World!');
    assert.strictEqual(result, false);

    // Recover the original Math.random function
    Math.random = MathRandomFunction;
});

test("Test Application's getNames", async () => {
    const fakeData = `Holo\nGawr_Gura\nOuO\nOwO\nOOAAAOooooAAOOOAOZZzzzz`;
    const fakeFile = 'name_list.txt';
    await writeFile(fakeFile, fakeData, 'utf8');

    const application = new Application();
    const [people, selected] = await application.getNames();

    assert.deepStrictEqual(people, ['Holo', 'Gawr_Gura', 'OuO', 'OwO', 'OOAAAOooooAAOOOAOZZzzzz']);
    assert.deepStrictEqual(selected, []);
    fs.unlinkSync(fakeFile);
});

test("Test Application's getRandomPerson", async () => {
    const fakeData = `Holo\nGawr_Gura\nOuO\nOwO\nOOAAAOooooAAOOOAOZZzzzz`;
    const fakeFile = 'name_list.txt';
    await writeFile(fakeFile, fakeData, 'utf8');

    const application = new Application();
    const [people, selected] = await application.getNames();

    assert.deepStrictEqual(people, ['Holo', 'Gawr_Gura', 'OuO', 'OwO', 'OOAAAOooooAAOOOAOZZzzzz']);
    assert.deepStrictEqual(selected, []);

    // See if the random person is in the list

    const numberOfTests = 5;

    for (let i = 0; i < numberOfTests; i++) {
        const person = application.getRandomPerson();
        assert.ok(application.people.includes(person));
    }
    fs.unlinkSync(fakeFile);
});

test("Test Application's selectNextPerson", async () => {
    const fakeData = `Gawr_Gura\nOOAAAOooooAAOOOAOZZzzzz\nOuO`;
    const fakeFile = 'name_list.txt';
    await writeFile(fakeFile, fakeData, 'utf8');

    const application = new Application();
    const [people, selected] = await application.getNames();

    assert.deepStrictEqual(people, ['Gawr_Gura', 'OOAAAOooooAAOOOAOZZzzzz', 'OuO']);
    assert.deepStrictEqual(selected, []);
    
    // Select the first person
    application.getRandomPerson = () => {return 'Gawr_Gura'};
    let person = application.selectNextPerson();
    assert.strictEqual(person, 'Gawr_Gura');
    assert.deepStrictEqual(application.selected, ['Gawr_Gura']);

    // Select already selected person
    let control = 0;
    application.getRandomPerson = () => {
        if (control === 0) {
            control = 1;
            return 'Gawr_Gura';
        } else {
            return 'OuO';
        }
    };
    person = application.selectNextPerson();
    assert.strictEqual(person, 'OuO');
    assert.deepStrictEqual(application.selected, ['Gawr_Gura', 'OuO']);

    // Select the third person
    application.getRandomPerson = () => {return 'OOAAAOooooAAOOOAOZZzzzz'};
    person = application.selectNextPerson();
    assert.strictEqual(person, 'OOAAAOooooAAOOOAOZZzzzz');
    assert.deepStrictEqual(application.selected, ['Gawr_Gura', 'OuO', 'OOAAAOooooAAOOOAOZZzzzz']);

    // All selected
    person = application.selectNextPerson();
    assert.strictEqual(person, null);
    assert.deepStrictEqual(application.selected, ['Gawr_Gura', 'OuO', 'OOAAAOooooAAOOOAOZZzzzz']);

    fs.unlinkSync(fakeFile);
});

test("Test Application's notifySelected", async () => {
    const fakeData = `Gawr_Gura\nTAT\nOuO`;
    const fakeFile = 'name_list.txt';
    await writeFile(fakeFile, fakeData, 'utf8');

    const application = new Application();
    const [people, selected] = await application.getNames();

    assert.deepStrictEqual(people, ['Gawr_Gura', 'TAT', 'OuO']);
    assert.deepStrictEqual(selected, []);

    // Create a spy for the MailSystem's write and send methods
    const mailSystemSpy = {
        write: test.mock.fn(MailSystem.prototype.write),
        send: test.mock.fn(MailSystem.prototype.send)
    };
    application.mailSystem = mailSystemSpy;
    application.selected = ['Gawr_Gura', 'TAT'];

    application.notifySelected();

    // Check the number of calls and the arguments of the calls
    assert.strictEqual(mailSystemSpy.write.mock.callCount(), 2);
    assert.strictEqual(mailSystemSpy.send.mock.callCount(), 2);

    // Check the arguments of the calls
    assert.deepStrictEqual(
        mailSystemSpy.write.mock.calls.map(
            call => call.arguments[0]
        ), ['Gawr_Gura', 'TAT']
    );
    assert.deepStrictEqual(
        mailSystemSpy.send.mock.calls.map(
            call => call.arguments[0]
        ), ['Gawr_Gura', 'TAT']
    );

    // Remove the fake file
    fs.unlinkSync(fakeFile);
});