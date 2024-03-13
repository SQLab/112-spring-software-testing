const test = require('node:test');
const assert = require('assert');
const fs = require('fs');
const { Application, MailSystem } = require('./main');

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary
// test("Test MailSystem's write", () => {
//     const mailsystem = new MailSystem();
//     assert.strictEqual(mailsystem.write("John"), 'Congrats, John!');
// });
// test("Test MailSystem's send",()=>{
//     //test('should send mail successfully', () => {
//         const mailsystem = new MailSystem();
//         const name = 'John';
//         Math.random = () => 0.7;
//         const result = mailsystem.send(name,mailsystem.write(name));
//         assert.strictEqual(result,true);
//         Math.random = originalMathRandom;

//         Math.random = () => 0.3;
//         const result_ = mailsystem.send(name,mailsystem.write(name));
//         assert.strictEqual(result_,false);
// });

const data = 'John\nJane\nDoe';

test("Test Application's getNames", async () => {
    //mock fs.readFile just using test runner
    fs.writeFileSync('name_list.txt', data, 'utf8');
    // fs.readFile = (path, encoding, cb) => {
    //     cb(null, data);
    // };
    const app = new Application();
    const [people,selected] = await app.getNames();
    assert.deepStrictEqual(people, ['John', 'Jane', 'Doe']);
    assert.deepStrictEqual(selected, []); 
    //fs.unlink('name_list.txt', () => {});
});


test("Test Application's getRandomPerson", async () => {
    let app = new Application();
    [app.people,app.selected] = await app.getNames();
    //const originalMathRandom = Math.random;
        Math.random = () => 0;
        let result = await app.getRandomPerson();
        assert.deepStrictEqual(result, 'John');
        Math.random = () => 0.5;
        result = await app.getRandomPerson();
        assert.deepStrictEqual(result, 'Jane');
        Math.random = () => 0.9;
        result = await app.getRandomPerson();
        assert.deepStrictEqual(result, 'Doe');
        Math.random = originalMathRandom;   
});

test("Test Application's selectNextPerson", async() => {
    let app = new Application();
    [app.people,app.selected] = await app.getNames();
    //const originalMathRandom = Math.random;
        //Math.random = () => 0;
        Math.random = originalMathRandom;
        Math.random = () => 0;
        assert.deepStrictEqual(app.selectNextPerson(), 'John');
        //Math.random = originalMathRandom;
        Math.random = () => 0.5; 
        assert.deepStrictEqual(app.selectNextPerson(), 'Jane');
        //Math.random = () => 0.9;
        Math.random = originalMathRandom;
        assert.deepStrictEqual(app.selectNextPerson(), 'Doe');
        assert.deepStrictEqual(app.selectNextPerson(), null);
        assert.deepStrictEqual(app.selectNextPerson(), null);
        assert.deepStrictEqual(app.selectNextPerson(), null);
        //fs.unlink('name_list.txt', () => {});
});

test("Test Application's notifySelected", async(t) => {
    let app = new Application();
    [app.people,app.selected] = await app.getNames();
        const originalMathRandom = Math.random;
        Math.random = () => 0;
        app.selectNextPerson();
        Math.random = () => 0.5;
        app.selectNextPerson();
        Math.random = () => 0.9;
        app.selectNextPerson();
        Math.random = originalMathRandom;
        
        t.mock.method(app.mailSystem,'write');
        t.mock.method(app.mailSystem,'send');
        Math.random = () => 0.7;
        app.notifySelected();
       
        let call_write = app.mailSystem.write.mock.calls[0];
        let call_send = app.mailSystem.send.mock.calls[0];
        
        assert.deepStrictEqual(call_send.arguments,['John','Congrats, John!']);
        assert.deepStrictEqual(call_write.arguments,['John']);
        assert.strictEqual(call_send.result,true);
        assert.strictEqual(call_write.result,'Congrats, John!');

        call_write = app.mailSystem.write.mock.calls[1];
        call_send = app.mailSystem.send.mock.calls[1];

        assert.deepStrictEqual(call_send.arguments,['Jane','Congrats, Jane!']);
        assert.deepStrictEqual(call_write.arguments,['Jane']);
        assert.strictEqual(call_send.result,true);
        assert.strictEqual(call_write.result,'Congrats, Jane!');

        call_write = app.mailSystem.write.mock.calls[2];
        call_send = app.mailSystem.send.mock.calls[2];

        assert.deepStrictEqual(call_send.arguments,['Doe','Congrats, Doe!']);
        assert.deepStrictEqual(call_write.arguments,['Doe']);
        assert.strictEqual(call_send.result,true);
        assert.strictEqual(call_write.result,'Congrats, Doe!');

        Math.random = () => 0.3;
        app.notifySelected();
        
        call_write = app.mailSystem.write.mock.calls[3];
        call_send = app.mailSystem.send.mock.calls[3];
        
        assert.deepStrictEqual(call_send.arguments,['John','Congrats, John!']);
        assert.deepStrictEqual(call_write.arguments,['John']);
        assert.strictEqual(call_send.result,false);
        assert.strictEqual(call_write.result,'Congrats, John!');

        call_write = app.mailSystem.write.mock.calls[4];
        call_send = app.mailSystem.send.mock.calls[4];

        assert.deepStrictEqual(call_send.arguments,['Jane','Congrats, Jane!']);
        assert.deepStrictEqual(call_write.arguments,['Jane']);
        assert.strictEqual(call_send.result,false);
        assert.strictEqual(call_write.result,'Congrats, Jane!');

        call_write = app.mailSystem.write.mock.calls[5];
        call_send = app.mailSystem.send.mock.calls[5];

        assert.deepStrictEqual(call_send.arguments,['Doe','Congrats, Doe!']);
        assert.deepStrictEqual(call_write.arguments,['Doe']);
        assert.strictEqual(call_send.result,false);
        assert.strictEqual(call_write.result,'Congrats, Doe!');
        Math.random = originalMathRandom;
        fs.unlink('name_list.txt', () => {}); // cleanup 
});
