const test = require('node:test');
const assert = require('assert');

const { Application, MailSystem } = require('./main');

test('test MailSystem', () => {
const mailSystem = new MailSystem();

    //test MailSystem-write

        const name = 'Annie';
        const context = mailSystem.write(name);
        assert.strictEqual(context, 'Congrats, Annie!');

    //test MailSystem-send
    //mock
    const mocksend = test.mock.fn(mailSystem.send);

    Math.random = () => 0.8;                                                                    
    assert.strictEqual(mocksend(name,context), true);          

    Math.random = () => 0.3;                                                                    
    assert.strictEqual(mocksend(name,context), false);                
});


const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);

test('create file', async () => {
    const file_content = "Ally\nJosh";
    await writeFile('name_list.txt', file_content, 'utf-8');   // create a fake file  
});


test('test Application', async () => {

    const app = new Application();  

    //test Application-getName

    const [people, selected] = await app.getNames();
    assert.deepStrictEqual(people, ['Ally', 'Josh']);
    assert.deepStrictEqual(selected, []);    


    //test Application-getRandomPerson

    Math.random = () => 0.3;
    assert.strictEqual(app.getRandomPerson(), 'Ally');  

    //test Application-selectNextPerson

    app.getRandomPerson = () => 'Ally';
    assert.strictEqual(app.selectNextPerson(),'Ally')
    
    app.getRandomPerson = () => 'Josh';
    assert.strictEqual(app.selectNextPerson(),'Josh')
    
    assert.strictEqual(app.selectNextPerson(), null)

    let i = 1;
    app.getRandomPerson = () => {
        if (i == 1) {
            i--;
            return 'Ally';
        }
        else
            return 'Josh';
    }
    app.selected = ["Ally"];
    assert.strictEqual(app.selectNextPerson(), 'Josh');


    //test Application-notifySelected
    assert.strictEqual(app.notifySelected(), undefined);


    fs.unlinkSync('name_list.txt');  // delete test file

}); 
