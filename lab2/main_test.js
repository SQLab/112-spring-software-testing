const {mock, test} = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


test("test mailsystem's write", () => {
    const mailSystem = new MailSystem();
    const name = "John";
    const context = mailSystem.write(name);
    assert.strictEqual(context, "Congrats, John!");
})

test("test mailsystem's send use node:test mock", (t) => {
    const mailSystem = new MailSystem();
    const name = "John";
    const context = "Congrats, John!";
    const OriginalMathRandom = Math.random;
    //control the Math.random() to always return 0.6 so that the mail is always sent
    Math.random = () => 0.6;
    const success = mailSystem.send(name, context);
    assert.strictEqual(success, true);
    //control the Math.random() to always return 0.1 so that the mail is always failed
    Math.random = () => 0.1;
    const failure = mailSystem.send(name, context);
    assert.strictEqual(failure, false);
    Math.random = OriginalMathRandom;
})



test("test Application's getNames", () => {
    //write a fake data to a file
    const data = "Alice\nBob\nCathy";
    writeFile('name_list.txt', data, 'utf8').then(() => {
        const application = new Application();
        application.getNames().then(([people, selected]) => {
            assert.deepStrictEqual(people, ["Alice", "Bob", "Cathy"]);
            assert.deepStrictEqual(selected, []);
        })
    })  
})

test("test Application's getRandomPerson", (t) => {
    const application = new Application();
    application.people = ["Alice", "Bob", "Cathy"];
    const person = application.getRandomPerson();
    assert.ok(application.people.includes(person));
})

test("test Application's selectNextPerson", (t) => {
    const application = new Application();
    application.people = ["Alice", "Bob", "Cathy"];
    application.selected = [];
    clk = 0;
    mock.method(application, 'getRandomPerson', () => {
        clk++;
        if (clk == 1) {
            return "Alice";
        } else if (clk == 2) {
            return "Bob";
        } 
    });
    const person = application.selectNextPerson();
    assert.ok(application.selected.includes(person));
    assert.strictEqual(application.selected.length, 1);
    clk = 0;
    const person2 = application.selectNextPerson();
    assert.ok(application.selected.includes(person2));
    assert.strictEqual(application.selected.length, 2);    
})

test("test Application's selectNextPerson when all people are selected", (t) => {
    const application = new Application();
    application.people = ["Alice", "Bob", "Cathy"];
    application.selected = ["Alice", "Bob", "Cathy"];
    const person = application.selectNextPerson();
    assert.strictEqual(person, null);
})

test("test Application's notifySelected", () => {
    //compare with log output
    const application = new Application();
    application.people = ["Alice", "Bob", "Cathy"];
    application.selected = ["Alice", "Bob"];
    spy_write = mock.method(application.mailSystem, 'write');
    spy_send = mock.method(application.mailSystem, 'send');
    //create a var message to store the console.log output
    var message = "";
    mock.method(console, 'log', (msg) => {
        message += msg + "\n";
    });
    mock.method(Math, 'random', () => 0.6);
    application.notifySelected();
    expected_logs = "--notify selected--\n--write mail for Alice--\n--send mail to Alice--\nmail sent\n--write mail for Bob--\n--send mail to Bob--\nmail sent\n";
    //assert the function call  times
    assert.strictEqual(spy_write.mock.calls.length, 2);
    assert.strictEqual(spy_send.mock.calls.length, 2);
    //assert the message
    assert.strictEqual(message, expected_logs);


    
    
})


