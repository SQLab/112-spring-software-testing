const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');
const fs = require('fs');

const util = require('util');
const writeFile = util.promisify(fs.writeFile);

test('Mail system write/send testing', (t) => {

    const mail_sys = new MailSystem();
    const write_to = 'Ed';
    const msg = 'Hello world';

    // writing tests
    const write = () => {
        return mail_sys.write(write_to);
    }

    // sending tests
    const send_success = () => {
        Math.random = () => 0.999;
        return mail_sys.send(write_to, msg);
    }

    const send_fail = () => {
        Math.random = () => 0.001;
        return mail_sys.send(write_to, msg);
    }


    const fn = t.mock.fn(write);
    assert.strictEqual(fn(), 'Congrats, ' + write_to + '!');

    fn.mock.mockImplementation(send_success);
    assert.strictEqual(fn(), true);

    fn.mock.mockImplementation(send_fail);
    assert.strictEqual(fn(), false);
});


test('Application testing', async (t) => {

    // creating file
    const txt_content = 'Ed\nFin\nGad\nHop';
    const people_arr = ['Ed', 'Fin', 'Gad', 'Hop'];
    await writeFile('name_list.txt', txt_content, 'utf8');
    const app = new Application();

    // getNames test
    const getNames = async () => {
        return await app.getNames();
    }
    const fn = t.mock.fn(getNames);
    const [people, selected] = await fn();
    assert.deepStrictEqual(people, people_arr);
    assert.deepStrictEqual(selected, []);

    // getRnadomPerson test
    const selectRandomPerson = async () => {
        Math.random = () => 0;
        return app.getRandomPerson();
    }
    fn.mock.mockImplementation(selectRandomPerson);
    assert.strictEqual(await fn(), 'Ed');


    // selectNextPerson test
    const selectAllPerson = async () => {
        // redundant index: select previous person again
        const redundantIndex = 2;
        let rndSelect = 0;
        let selected = null;
        app.getRandomPerson = () => {
            if (rndSelect >= redundantIndex){
                selected = app.people[rndSelect-1];
            }
            else{
                selected = app.people[rndSelect];
            }
            rndSelect = rndSelect + 1;
            return selected;
        }

        let select_order = [];
        for(rndSelect; rndSelect<5;){
            select_order.push(app.selectNextPerson());
        }
        select_order.push(app.selectNextPerson());
        return select_order;
    }

    fn.mock.mockImplementation(selectAllPerson);
    assert.deepStrictEqual(await fn(), people_arr.concat([null]));

    // Notify test
    const notify = async () => {
        Math.random = () => 0.999;
        app.notifySelected();
    }

    fn.mock.mockImplementation(notify);
    await notify();
    assert.strictEqual(await fn(), undefined);

    // Delete unwanted txt files
    fs.unlinkSync('name_list.txt');
})