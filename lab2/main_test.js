const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');

const fs = require('fs');

const testNameList = ['Alice', 'Bob', 'Chris', 'Dave', 'Eric'];
const testNameText = testNameList.join('\n');

async function getNamesSpy(){
    return [testNameList, []];
}

test("Test MailSystem's write", {skip: false}, (t) => {

    const mailSystem = new MailSystem();
    const writeName = testNameList[0];

    const resultWrite = mailSystem.write(writeName);
    assert.strictEqual(resultWrite, 'Congrats, ' + writeName + '!');
})

test("Test MailSystem's send",{skip: false}, (t) => {

    const mailSystem = new MailSystem();
    const sendName = testNameList[0];

    /* return true */
    t.mock.method(Math, 'random').mock.mockImplementation(() => 0.6);
    const resultTrue = mailSystem.send(sendName, 'Congrats, ' + sendName + '!');
    assert.strictEqual(resultTrue, true);

    /* return false */
    t.mock.method(Math, 'random').mock.mockImplementation(() => 0.4);
    const resultFalse = mailSystem.send(sendName, 'Congrats, ' + sendName + '!');
    assert.strictEqual(resultFalse, false);
});

test("Test Application's getNames",{skip: false}, async (t) => {
    
    /* write a testing file name_list.txt */
    fs.writeFileSync('name_list.txt', testNameText);

    /* spy on getNames function */
    const getNamesSpy = t.mock.fn(Application.prototype.getNames);
    const result = await getNamesSpy();
    
    const resultPeople = result[0];
    const resultSelected = result[1];

    assert.deepStrictEqual(resultPeople, testNameList);
    assert.deepStrictEqual(resultSelected, []);

    /* remove the testing file name_list.txt */
    fs.unlinkSync('name_list.txt');
});

test("Test Application's getRandomPerson",{skip: false}, async (t) => {

    /* stub getNames function */
    t.mock.method(Application.prototype, 'getNames').mock.mockImplementation(getNamesSpy);

    const app = new Application();
    await app.getNames();

    for (let i = 0; i < testNameList.length; i++) {
        /* stub Math.random to return 1/length */
        t.mock.method(Math, 'random').mock.mockImplementation( () => i / testNameList.length);
        assert.strictEqual(app.getRandomPerson(), testNameList[i]);
    }
});

test("Test Application's selectNextPerson",{skip: false}, async (t) => {

    /* stub getNames function */
    t.mock.method(Application.prototype, 'getNames').mock.mockImplementation(getNamesSpy);

    const app = new Application();
    await app.getNames();

    /* 
     * stub getRandomPerson to return i-th person
     * increment 1 for testing duplicate selected person
     */
    let i = 0;
    function getRandomPersonStub(){
        return testNameList[i++];
    }
    t.mock.method(app, 'getRandomPerson').mock.mockImplementation(getRandomPersonStub);
    assert.strictEqual(app.selectNextPerson(), testNameList[i - 1]);

    for (i = 0; i < testNameList.length;){
        assert.strictEqual(app.selectNextPerson(), testNameList[i - 1]);
    }

    assert.strictEqual(app.selectNextPerson(), null);
});

test("Test Application's notifySelected",{skip: false}, async (t) => {
    
        /* stub getNames function */
        t.mock.method(Application.prototype, 'getNames').mock.mockImplementation(getNamesSpy);

        /* 
         * spy Mailsystem write 
         * always return true and do nothing
         * make sure that notifySelected won't be effected by MailSystem
         */
        const writeSpy = t.mock.fn(() => {true});
        t.mock.method(MailSystem.prototype, 'write').mock.mockImplementation(writeSpy);
        
        /* spy MailSystem send */
        const sendSpy = t.mock.fn(() => {true});
        t.mock.method(MailSystem.prototype, 'send').mock.mockImplementation(sendSpy);
    
        const app = new Application();
        await app.getNames();
        app.selected = testNameList;
    
        app.notifySelected();
    
        /* check call times of MailSystem member function */
        assert.strictEqual(writeSpy.mock.calls.length, testNameList.length);
        assert.strictEqual(sendSpy.mock.calls.length, testNameList.length);
    }
);
