const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');
const fs = require('fs');
const util = require('util');
const { Console } = require('console');
const writeFile = util.promisify(fs.writeFile);

const name = "Hanni"
test('Test mail system', (name) =>{
    const mailSystem = new MailSystem();
    const msg = "super shy";
    const mockFunc = test.mock.fn(mailSystem.write);
    assert.strictEqual(mockFunc(name),"Congrats, "+name+"!");
    mockFunc.mock.mockImplementation(mailSystem.send);
    Math.random = () => 0.9;
    assert.equal(mockFunc(name, msg), true);
    Math.random = () => 0.1;
    assert.equal(mockFunc(name, msg),false); 
});
const namelist = 'hanni\nhaerin\nhyein\nminji\ndanielle'
test('Test application', async () => {
    await writeFile('name_list.txt', namelist, 'utf-8');
    const app = new Application();
    const [app_name,app_selected] = await app.getNames();
    assert.deepStrictEqual([app_name,app_selected],[['hanni','haerin','hyein','minji','danielle'],[]]);
    const randPerson = app.getRandomPerson();
    assert.ok(app.people.includes(randPerson));
    function mockSelNext(){
        return app.selectNextPerson();
    }
    const mockFunc2 = test.mock.fn(mockSelNext);
    app.getRandomPerson = () => 'hanni';
    assert.equal(mockFunc2(),'hanni');
    app.getRandomPerson = () => 'haerin';
    assert.equal(mockFunc2(),'haerin');
    app.getRandomPerson = () => 'hyein';
    assert.equal(mockFunc2(),'hyein');
    app.getRandomPerson = () => 'minji';
    assert.equal(mockFunc2(),'minji');
    app.getRandomPerson = () => ['danielle']
    assert.equal(mockFunc2(),'danielle');
    assert.equal(mockFunc2(),null);
    let first = 1;
    app.getRandomPerson = () => {
        if(first == 1){
            first--;
            return 'hanni';
        }else{
            return 'haerin';
        }
    }
    app.selected = ['hanni'];
    assert.equal(mockFunc2(),'haerin');
    app.selected = ['hanni','haerin','hyein','minji','danielle'];
    const mailmockW = test.mock.fn(MailSystem.prototype.write);
    const mailmockS = test.mock.fn(MailSystem.prototype.send);
    app.mailSystem.write = mailmockW;
    app.mailSystem.send = mailmockS;
    app.notifySelected();
    assert.strictEqual(app.mailSystem.write.mock.callCount(),5);
    assert.strictEqual(app.mailSystem.send.mock.callCount(),5);
    app.mailSystem = new MailSystem();
    const rs = app.notifySelected();
    assert.strictEqual(rs, undefined);
    fs.unlinkSync('name_list.txt');
});