const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary

test("Test MailSystem's write", () => {
    const mailSystem = new MailSystem();
    const result = mailSystem.write('James');
    assert.strictEqual(result, 'Congrats, James!');
});

test("Test MailSystem's send", () => {

    const mailSystem = new MailSystem();

    // stub Math.random to return value <= 0.5
    Math.random = () => 0.4;
    const result1 = mailSystem.send('James', 'Congrats, James!');
    assert.strictEqual(result1, false);
    
    // stub Math.random to return value > 0.5
    Math.random = () => 0.6;
    const result2 = mailSystem.send('James', 'Congrats, James!');
    assert.strictEqual(result2, true);

});