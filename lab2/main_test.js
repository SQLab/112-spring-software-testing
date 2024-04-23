const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');
const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);

test('test mailsystem', (t) =>{
    const mailsystem = new MailSystem();
    const name = 'Jim';
    function write()
    {
        return mailsystem.write(name);
    }
    function send()
    {
        context = mailsystem.write(name);
        return mailsystem.send(name,context);
    }
    const fn = t.mock.fn(write);
    assert.equal(fn(), 'Congrats, Jim!');
    fn.mock.mockImplementation(send);
    global.Math.random = () => 0.6;
    assert.equal(fn(), true);
    global.Math.random = () => 0.4;
    assert.equal(fn(), false);
});

test('test application', async(t) =>{
    const content = 'Jim\nJohn\nAlice\nBob';
    await writeFile('name_list.txt', content, 'utf-8');
    const application = new Application();
    const [people, selected] = await application.getNames();
    assert.deepStrictEqual(people, ['Jim','John','Alice','Bob']);
    assert.deepStrictEqual(selected,[]);
    global.Math.random = () => 0.5;
    function getRandomPerson()
    {
        return application.getRandomPerson();
    }
    function selectNextPerson()
    {
        return application.selectNextPerson();
    }
    const fn = t.mock.fn(getRandomPerson);
    assert.equal(fn(), 'Alice');
    fn.mock.mockImplementation(selectNextPerson);
    application.getRandomPerson = () => 'Jim';
    assert.deepStrictEqual(fn(), 'Jim');
    application.getRandomPerson = () => 'John';
    assert.deepStrictEqual(fn(), 'John');
    application.getRandomPerson = () => 'Alice';
    assert.deepStrictEqual(fn(), 'Alice'); 
    application.getRandomPerson = () => 'Bob';
    assert.deepStrictEqual(fn(), 'Bob');
    assert.deepStrictEqual(fn(), null);
    let flag = 0;
    application.getRandomPerson = () =>
    {
        if (flag % 4 == 0)
        {
            flag++
            return 'Jim';
        }
        if (flag % 4 == 1)
        {
            flag++
            return 'John';
        }
        if (flag %4 ==2)
        {
            flag++
            return 'Alice';
        }
        if (flag % 4 == 3)
        {
            flag++
            return 'Bob';
        }
    };
    application.selected = ['Jim'];
    assert.deepStrictEqual(fn(), 'John');
    assert.deepStrictEqual(fn(), 'Alice');
    assert.deepStrictEqual(fn(), 'Bob');
    global.Math.random = () => 0.6;
    application.selected = ['Jim'];
    assert.deepStrictEqual(application.notifySelected(),undefined);
    fs.unlinkSync('name_list.txt');
});
