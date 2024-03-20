const test = require('node:test');
const assert = require('assert');
const fs = require('node:fs');      // for write file
const util = require('util');
const writeFile = util.promisify(fs.writeFile);
const { Application, MailSystem } = require('./main');

test("Test class MailSystem's write function", () => {

    const mail_system = new MailSystem();
    assert.strictEqual(mail_system.write("jett"), "Congrats, jett!");

});

test("TTest class MailSystem's send function", () => {
    
    const mail_system = new MailSystem();

    // store original random function
    const ori_random_func = Math.random;

    // for mail sent case
    Math.random = () => 0.8;
    let response = mail_system.send("jett", "hi bro");
    assert.strictEqual(response, true);

    // for mail failed case
    Math.random = () => 0.3;
    response = mail_system.send("jett", "hi bro");
    assert.strictEqual(response, false);

    // Recover original random function
    Math.random = ori_random_func;
    
});

test("Test class Application's getNames function", async() => {

    // fake people for testing application class
    const test_file_content = "jett\nbrain\npeter";
    const file_path = "name_list.txt";
    await writeFile(file_path, test_file_content, 'utf8');

    const application = new Application();
    
    // getNames function response
    const [res_people, res_selected] = await application.getNames();

    assert.deepStrictEqual(res_people, ["jett", "brain", "peter"]); // compare name
    assert.deepStrictEqual(res_selected, []);                        // compare selected

    // delete test file
    fs.unlinkSync(file_path);   

});

test("Test class Application's getRandomPerson function", async () => {

    // fake people for testing application class
    const test_file_content = "jett\nbrain\npeter";
    const file_path = "name_list.txt";
    await writeFile(file_path, test_file_content, 'utf8');

    const application = new Application();

    // getNames function response
    const [res_people, res_selected] = await application.getNames();
    assert.deepStrictEqual(res_people, ["jett", "brain", "peter"]);
    assert.deepStrictEqual(res_selected, []);


    // getRandomPerson function response
    pick_person = application.getRandomPerson();

    // check whether pick_person exist in people
    assert.ok(res_people.includes(pick_person));

    // delete test file
    fs.unlinkSync(file_path);  

});

//***
test("Test class Application's selectNextPerson function", async () => {

    // fake people for testing application class
    const test_file_content = "jett\nbrain";
    const file_path = "name_list.txt";
    await writeFile(file_path, test_file_content, 'utf8');

    var application = new Application();

    // getNames function response
    const [res_people, res_selected] = await application.getNames();
    assert.deepStrictEqual(res_people, ["jett", "brain"]);
    assert.deepStrictEqual(res_selected, []);

    // for people.length < this.selected.length case
    origin_func = application.getRandomPerson
    application.getRandomPerson = () => "jett";
    assert.strictEqual(application.selectNextPerson(), "jett");
    assert.deepStrictEqual(application.selected, ["jett"]);

    application.getRandomPerson = () => "brain";
    assert.strictEqual(application.selectNextPerson(), "brain");
    assert.deepStrictEqual(application.selected, ["jett", "brain"]);

    // not enter while loop
    // for people.length === this.selected.length case
    application.getRandomPerson = origin_func;
    assert.strictEqual(application.selectNextPerson() , null);
    assert.deepStrictEqual(application.selected, ["jett", "brain"]);

    // for people.length < this.selected.length case
    application.selected = []
    application.getRandomPerson = () => "brain";
    assert.strictEqual(await application.selectNextPerson(), "brain");
    assert.deepStrictEqual(application.selected, ["brain"]);

    application.getRandomPerson = () => "jett";
    assert.strictEqual(await application.selectNextPerson(), "jett");
    console.log(application.selected);
    assert.deepStrictEqual(application.selected, ["brain", "jett"]);

    let cnt = 0;
    application.getRandomPerson = () => {
        if (cnt % 2) {
            return "brain";
        } else {
            cnt++;
            return "jett";
        }
    }

    // enter while loop
    application.selected = ["jett"];
    assert.strictEqual(application.selectNextPerson(), "brain");
    assert.deepStrictEqual(application.selected, ["jett", "brain"]);

    // delete test file
    fs.unlinkSync(file_path);  

});

test("Test class Application's notifySelected function", async () => {

    // fake people for testing application class
    const test_file_content = "jett\nbrain\npeter";
    const file_path = "name_list.txt";
    await writeFile(file_path, test_file_content, 'utf8');

    const application = new Application();
    application.selected = ["jett", "brain", "peter"];

    const mock_mail_system = {
        write: test.mock.fn(MailSystem.prototype.write),
        send: test.mock.fn(MailSystem.prototype.send)
    };

    application.mailSystem = mock_mail_system;
    application.notifySelected();

    // check count of function call
    assert.strictEqual(application.mailSystem.write.mock.callCount(), 3);
    assert.strictEqual(application.mailSystem.send.mock.callCount(), 3);

    // check input arugment for function call
    for(let i = 0; i < application.selected.length; i++){
        assert.strictEqual(application.mailSystem.write.mock.calls[i].arguments[0], application.selected[i]);
        assert.strictEqual(application.mailSystem.send.mock.calls[i].arguments[0], application.selected[i]);
    }

    // delete test file
    fs.unlinkSync(file_path); 

});

