const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');


test('test mailsystem', (t) => {
    const mailsystem = new MailSystem();
    const fn = t.mock.fn(mailsystem.write);

    const name = 'Gary';
    assert.strictEqual(fn(name), 'Congrats, ' + name + '!');  // test wrtie()

    fn.mock.mockImplementation(mailsystem.send);
    Math.random = () => 1;                              // assign random to 1                                           
    assert.strictEqual(fn(name), true);                 // test send() true

    Math.random = () => 0;                              // assign random to 0                                           
    assert.strictEqual(fn(name), false);                // test send() falsa
});


const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);

test('create file', async (t) => {
    const file_content = "Gary\nPeter";
    await writeFile('name_list.txt', file_content, 'utf-8');   // create a fake file
});

test('test application', async (t) => {
    const application = new Application();
    // const file_content = "Gary\nPeter";
    // await writeFile('name_list.txt', file_content, 'utf-8');   // create a fake file

    // ========================== getName =============================

    const [people, selected] = await application.getNames();
    assert.deepStrictEqual(people, ['Gary', 'Peter']);
    assert.deepStrictEqual(selected, []);                      // test getNames();

    // ================================================================

    // ===================== getRandomPerson ==========================

    Math.random = () => 0.1;
    const random_respond = application.getRandomPerson();
    assert.strictEqual(random_respond, 'Gary');                // test getRandomPerson();

    // ================================================================

    // ===================== selectNextPerson =========================

    application.getRandomPerson = () => 'Gary';
    const respond1 = application.selectNextPerson();
    assert.strictEqual(respond1, 'Gary');

    application.getRandomPerson = () => 'Peter';
    const respond2 = application.selectNextPerson();
    assert.strictEqual(respond2, 'Peter');

    const respond3 = application.selectNextPerson();
    assert.strictEqual(respond3, null);



    let cnt = 0;
    application.getRandomPerson = () => {
        if (cnt == 0) {
            cnt++;
            return "Gary";
        }
        else
            return "Pater";
    }
    application.selected = ["Gary"];
    assert.strictEqual(application.selectNextPerson(), "Pater");     // force into while loop

    // ================================================================

    // ====================== notifySelected ==========================

    const notify_respond = application.notifySelected();
    assert.strictEqual(notify_respond, undefined);

    // ================================================================

    fs.unlinkSync('name_list.txt'); // delete test file
});

