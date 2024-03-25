const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');

test('Application selects and notifies a person', () => {

  const mailSystemStub = {
    write: () => 'Mocked context',
    send: () => true,
  };


  const app = new Application();
  app.mailSystem = mailSystemStub;


  assert.strictEqual(app.selectNextPerson(), 'John Doe');

  app.notifySelected();

  assert.strictEqual(mailSystemStub.write.calledWith('John Doe'), true);
  assert.strictEqual(mailSystemStub.send.calledWith('John Doe', 'Mocked context'), true);
});
