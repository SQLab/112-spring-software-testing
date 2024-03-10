const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary

test("Test MailSystem's write", () => {
    const mailSystem = new MailSystem();
    const context = mailSystem.write('name');
    assert.strictEqual(context, 'Congrats, name!');
});

test("Test MailSystem's send", () => {
    const mailSystem = new MailSystem();
    const out = mailSystem.send('name', 'Congrats, name!');
    assert.ok(out === true || out === false);
    
    const originalRandom = Math.random; //模擬stub，儲存原本的 Math.random 

    Math.random = () => 0.99; // 模擬發送成功
    const success = mailSystem.send('name', 'Congrats, name!');
    assert.strictEqual(success, true);

    Math.random = () => 0; // 模擬發送失敗
    const successFailure = mailSystem.send('name', 'Congrats, name!');
    assert.strictEqual(successFailure, false);

    Math.random = originalRandom; // 還原 Math.random

});


const fakeNameList = "Alice\nBob\nCharlie"; 
const testFileName = 'name_list.txt';
const fs = require('fs'); 
const util = require("util");
const writeFile = util.promisify(fs.writeFile);

test("Test Application's getNames", async () => {
    await writeFile(testFileName, fakeNameList, 'utf8');

    const application = new Application();
    const [people, selected] = await application.getNames();

    assert.deepStrictEqual(people, ['Alice', 'Bob', 'Charlie']);
    assert.deepStrictEqual(selected, []);

    await util.promisify(fs.unlink)(testFileName); //刪除檔案
});

test("Test Application's getRandomPerson", async() => {
    await writeFile(testFileName, fakeNameList, 'utf8');

    const application = new Application();
    const [people, selected] = await application.getNames();
    
    const randomPerson = application.getRandomPerson();
    assert.ok(people.includes(randomPerson));

    const originalMathRandom = Math.random;

    Math.random = () => 0.3;
    const randomPerson1 = application.getRandomPerson();
    assert.strictEqual(randomPerson1, 'Alice');

    Math.random = () => 0.6;
    const randomPerson2 = application.getRandomPerson();
    assert.strictEqual(randomPerson2, 'Bob');

    Math.random = () => 0.9;
    const randomPerson3 = application.getRandomPerson();
    assert.strictEqual(randomPerson3, 'Charlie');

    Math.random = originalMathRandom;
    await util.promisify(fs.unlink)(testFileName);
});

test("Test Application's selectNextPerson", async() => {
    await writeFile(testFileName, fakeNameList, 'utf8');

    const application = new Application();
    await application.getNames(); 

    const selectedPerson2 = application.selectNextPerson();
    assert.ok(application.people.includes(selectedPerson2));
    
    application.selected = ['Alice', 'Bob'];
    const selectedPerson1 = application.selectNextPerson();
    assert.strictEqual(selectedPerson1, 'Charlie');

    const selectedPerson3 = application.selectNextPerson();
    assert.strictEqual(selectedPerson3, null);

    await util.promisify(fs.unlink)(testFileName);
});

test ("Test Application's notifySelected function", async (test) => {
    await writeFile(testFileName, fakeNameList, 'utf8');

    const application = new Application() ;
    let [people, selected] = await application.getNames() ;

    const writeSpy = test.mock.fn(MailSystem.prototype.write) ; //spy MailSystem's write
    const sendSpy = test.mock.fn(MailSystem.prototype.send) ; 

    application.selected = ["Alice", "Bob"] ;
    application.mailSystem.write = writeSpy ;
    application.mailSystem.send = sendSpy ;
    application.notifySelected() ;

    assert.strictEqual(writeSpy.mock.callCount(), application.selected.length); 
    assert.strictEqual(sendSpy.mock.callCount(), application.selected.length);
    
    const writeCalls = writeSpy.mock.calls ; // writeSpy 的呼叫參數
    const sendCalls = sendSpy.mock.calls ; 
    
    assert.strictEqual(writeCalls[0].arguments[0], application.selected[0]);
    assert.strictEqual(sendCalls[0].arguments[0], application.selected[0]);
    assert.strictEqual(writeCalls[1].arguments[0], application.selected[1]);
    assert.strictEqual(sendCalls[1].arguments[0], application.selected[1]);

    test.mock.reset(); // reset mock and spy
    await util.promisify(fs.unlink)(testFileName);
}) ;