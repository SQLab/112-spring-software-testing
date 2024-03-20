const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');
const fs = require('fs') ;
const util = require('util') ;
const readFile = util.promisify(fs.readFile) ;

test ("Test MailSystem's write function", (test) => {
    // test console.log
    // test return value
    let logOutput = "";
    test.mock.method (console, 'log', (output) => {
        logOutput += output;
    });

    const spy = test.mock.fn(MailSystem.prototype.write);

    // test case 1
    assert.strictEqual(spy("John"), "Congrats, John!", `Expected return string failed}`);
    assert.strictEqual(logOutput, "--write mail for John--", `Expected console.log failed`);
    logOutput = "";

    // test case 2
    assert.strictEqual(spy("123"), "Congrats, 123!", `Expected return string failed`) ;
    assert.strictEqual(logOutput, "--write mail for 123--", `Expected console.log failed`);
    logOutput = "";

    // test case 3
    assert.strictEqual(spy(""), "Congrats, !", `Expected to have empty name`);
    assert.strictEqual(logOutput, "--write mail for --", `Expected console.log failed`);
}) ;

test ("Test MailSystem's send function", (test) => {
    // test console.log
    // test return value
    let value = 0 ;
    test.mock.method (Math, 'random', () => value) ;

    let logOutput = "" ;
    test.mock.method (console, 'log', (output) => {
        logOutput += output ;
    }) ;

    const spy = test.mock.fn(MailSystem.prototype.send) ;

    // test case 1, success
    value = 0.7 ;
    assert.strictEqual(spy("John", "Congrats, John!"), true, `Expected send mail to John to be successful`) ;
    assert.strictEqual(logOutput, "--send mail to John--mail sent", `Expected console.log failed`) ;   
    logOutput = "" ;

    // test case 2, failure
    value = 0.3 ;
    assert.strictEqual(spy("John", "Congrats, John!"), false, `Expected send mail to John to fail`) ;
    assert.strictEqual(logOutput, "--send mail to John--mail failed", `Expected console.log failed`) ;
}) ;

test ("Test Application's getNames function", async (test) => {
    let file_name = "name_list.txt" ;
    let file_content = "ABC\nDEF\nGHI\nJKL\nMNO\n" ;
    fs.writeFileSync(file_name, file_content) ;

    const spy = test.mock.fn(Application.prototype.getNames) ;
    let [people, selected] = await spy() ;

    let expected_people = ["ABC", "DEF", "GHI", "JKL", "MNO", ""] ;
    let expected_selected = [] ;
    assert.deepStrictEqual(people, expected_people, `Expected people to be the parsed file content ${expected_people}`) ;
    assert.deepStrictEqual(selected, expected_selected, `Expected selected to be empty`) ;

    fs.unlinkSync (file_name) ;
}) ;

test ("Test Application's getRandomPerson function", async (test) => {
    let file_name = "name_list.txt" ;
    let file_content = "ABC\nDEF\nGHI\nJKL\nMNO\n" ;
    fs.writeFileSync(file_name, file_content) ;

    const app = new Application() ;
    let [people, _] = await app.getNames() ;

    assert.ok(people.includes(app.getRandomPerson()), `Expected randomperson to be included in ${people}`);

    fs.unlinkSync (file_name) ;
}) ;

test ("Test Application's selectNextPerson function", async (test) => {
    // test console.log
    // test return value
    // test selected array
    // test different state of people and selected
    let file_name = "name_list.txt" ;
    let file_content = "ABC\nDEF\nGHI\nJKL\nMNO\n" ;
    fs.writeFileSync(file_name, file_content) ;

    let logOutput = "" ;
    test.mock.method (console, 'log', (output) => {
        logOutput += output ;
    }) ;

    const app = new Application() ;
    let [people, selected] = await app.getNames() ;

    // test case 1 each person is selected once
    for (let i = 0 ; i < people.length ; i++) {
        person = app.selectNextPerson() ;
        selected.push(person) ;
        assert.strictEqual(logOutput, "--select next person--", `Expected console.log failed`);
        logOutput = "" ;
        assert.ok(people.includes(person), `Expected selected person to be in people`);
    }

    // test case 2 all people are selected
    assert.deepStrictEqual(selected.sort(), people.sort(), `Expected selected to be the same as people, after all people are selected`);

    //  test case 3 all people are selected but still select
    person = app.selectNextPerson() ;
    assert.strictEqual(person, null, `Expected selectNextPerson to return null, after all people are selected`);
    assert.strictEqual(logOutput, "--select next person--all selected", `Expected console.log failed`);

    fs.unlinkSync (file_name) ;
}) ;

test ("Test Application's notifySelected function", async (test) => {
    // test console.log
    // test mailSystem.write
    // test mailSystem.send
    let file_name = "name_list.txt" ;
    let file_content = "ABC\nDEF\nGHI\nJKL\nMNO" ;
    fs.writeFileSync(file_name, file_content) ;

    let logOutput = "" ;
    test.mock.method (console, 'log', (output) => {
        logOutput += output ;
    }) ;

    const spy_write = test.mock.fn(MailSystem.prototype.write) ;
    const spy_send = test.mock.fn(MailSystem.prototype.send) ;

    const app = new Application() ;
    let [people, selected] = await app.getNames() ;
    app.notifySelected() ;
    assert.strictEqual(logOutput, "--notify selected--", `Expected console.log failed`);
    app.selected = people ;
    app.mailSystem.write = spy_write ;
    app.mailSystem.send = spy_send ;
    app.notifySelected() ;

    assert.strictEqual(spy_write.mock.callCount(), people.length, `Expected write to be called for each person`);
    assert.strictEqual(spy_send.mock.callCount(), people.length, `Expected send to be called for each person`);
    const write_calls = spy_write.mock.calls ;
    const send_calls = spy_send.mock.calls ;
    for (let i = 0 ; i < people.length ; i++) {
        assert.strictEqual(write_calls[i].arguments[0], people[i], `Expected write to be called with the cooresponding person`);
        assert.strictEqual(send_calls[i].arguments[0], people[i], `Expected send to be called with the cooresponding person`);
        assert.strictEqual(send_calls[i].arguments[1], "Congrats, " + people[i] + "!", `Expected write to be called with cooresponding message`);
    }

    fs.unlinkSync (file_name) ;
}) ;