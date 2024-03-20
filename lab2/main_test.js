const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');

const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);

test('test MailSystem', (t) => {
    const mailsystem = new MailSystem();
    n = 'John'
    function write(){
        return mailsystem.write(n)
    }function send(){
        context = mailsystem.write(n);
        return mailsystem.send(n, context);
    }

    fn = t.mock.fn(write);
    assert.strictEqual(fn(), 'Congrats, John!');
    fn.mock.mockImplementation(send);
    Math.random = () => 0.6;
    assert.strictEqual(fn(), true);
    Math.random = () => 0.4;
    assert.strictEqual(fn(), false);
});

test('test getNames', async() =>{
    const name_list = 'John\nMay\nAlex\nJay\nPeggy';
    await writeFile('name_list.txt', name_list, 'utf-8');
    const app = new Application();
    const [people, selected] = await app.getNames();

    assert.deepStrictEqual(people, ['John','May','Alex','Jay','Peggy']);
    assert.deepStrictEqual(selected, []);
});

test('test getRandomPerson', async() =>{
    const name_list = 'John\nMay\nAlex\nJay\nPeggy';
    await writeFile('name_list.txt', name_list, 'utf-8');
    const app = new Application();
    const [people, selected] = await app.getNames();

    for(var i=0; i<app.people.length; i++){
        person = app.getRandomPerson();
        assert(people.includes(person));
    }
});


test('test selectNextPerson', async(t) =>{
    const name_list = 'John\nMay';
    await writeFile('name_list.txt', name_list, 'utf-8');
    const app = new Application();
    const [people, selected] = await app.getNames();
    flag = 0;
    app.getRandomPerson = () => {
        flag++;
        if (flag % 2) return 'John';
        else return 'May';
    }

    person = app.selectNextPerson();
    assert.strictEqual(person, 'John');
    assert.deepStrictEqual(app.selected[0], 'John');

    flag = 0;
    person = app.selectNextPerson();
    assert.strictEqual(person, 'May');
    assert.deepStrictEqual(app.selected[1], 'May');

    person = app.selectNextPerson();
    assert.strictEqual(person, null);
});

test('test notifySelected', async() =>{
    const name_list = 'John';
    await writeFile('name_list.txt', name_list, 'utf-8');
    const app = new Application();
    const mailSystemMock = new MailSystemMock();
    app.mailSystem = mailSystemMock;
    const [people, selected] = await app.getNames();

    Math.random = () => 0.1;
    app.selectNextPerson();
    app.notifySelected();
    assert.strictEqual(mailSystemMock.writeCalls.length, 1);
    assert.strictEqual(mailSystemMock.sendCalls.length, 1);

    fs.unlinkSync('name_list.txt');
});

class MailSystemMock extends MailSystem {
    constructor() {
        super();
        this.writeCalls = [];
        this.sendCalls = [];
    }write(name){
        this.writeCalls.push(name);
        return super.write(name);
    }send(name, context){
        this.sendCalls.push({name, context});
        return super.send(name, context);
    }
};

