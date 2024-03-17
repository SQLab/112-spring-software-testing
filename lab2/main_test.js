const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');
const sinon = require('sinon');

test('notifySelected sends mail to all selected people', async () => {
    const mockMailSystem = sinon.createStubInstance(MailSystem);
    mockMailSystem.send.returns(true);  // 假設發送郵件總是成功

    const app = new Application();
    app.mailSystem = mockMailSystem;  // 使用模擬的 MailSystem

    // 假設 getNames 方法返回特定的名單
    app.getNames = async () => {
        return [['Alice', 'Bob', 'Charlie'], ['Alice']];
    };

    await app.getNames();
    app.selectNextPerson();  // 選擇下一個人（假設為 Bob）
    app.notifySelected();

    // 驗證 send 方法是否被調用了正確的次數（應為已選擇人數）
    assert.strictEqual(mockMailSystem.send.callCount, app.selected.length);

    // 確保 send 方法被正確的參數調用
    app.selected.forEach((person) => {
        assert(mockMailSystem.send.calledWith(person, `Congrats, ${person}!`));
    });
});

