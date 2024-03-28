const test = require('node:test');
const assert = require('assert');
// filesystem module
const fs = require("fs");

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary

// 透過mock方法模擬fs.readFile函數的行為，當讀檔時，不是讀取真實的檔案內容，而是返回模擬的內容
test.mock.method(fs, "readFile", (path, encoding, callback) => {
  callback(null, "test1\ntest2");
});

const { Application, MailSystem } = require('./main');

// Write Fuction Test
test("Write", async () => {
  const mailSystem = new MailSystem();
  assert.strictEqual(mailSystem.write("Write Test"), "Congrats, Write Test!");
});


// Send Function Test
test("Send", async () => {
  const mailSystem = new MailSystem();
  // 模擬Math.random函數，使其返回固定值1
  test.mock.method(Math, "random", () => 1);
  // 在Math.random返回1的情況下，測試send方法的返回值
  assert.strictEqual(mailSystem.send("Test", "Test_success"), true);
  // 改變Math.random的模擬返回值為0
  test.mock.method(Math, "random", () => 0);
  // 在Math.random返回0的情況下，測試send方法的返回值
  assert.strictEqual(mailSystem.send("Test", "Test_fail"), false);
  // 恢復所有模擬的方法到其原始狀態
  test.mock.restoreAll();
});

test("Application.getNames", async () => {
  const app = new Application();
  const [people, selected] = await app.getNames();
  assert.deepStrictEqual(people, ["test1", "test2"]);
  assert.deepStrictEqual(selected, []);
});

test("Application.getRandomPerson", async () => {
  // 模擬getNames方法的行為
  test.mock.method(Application.prototype, "getNames", async () => [
    ["test1", "test2"],
    [],
  ]);
  const app = new Application();
  console.log(await app.getNames()); // 僅用於等待構造函數
  // 模擬Math.random函數，使其返回固定值0
  test.mock.method(Math, "random", () => 0);
  assert.strictEqual(app.getRandomPerson(), "test1");
  // 改變Math.random的模擬返回值為0.99
  test.mock.method(Math, "random", () => 0.99);
  assert.strictEqual(app.getRandomPerson(), "test2");
  // 恢復所有模擬的方法到其原始狀態
  test.mock.restoreAll();
});

test("Application.selectNextPerson", async () => {
  const app = new Application();
  app.people = ["test1", "test2"];
  app.selected = ["test1"];
  let ocur = 0;
  // 模擬getRandomPerson方法的行為，並控制其返回值
  test.mock.method(app, "getRandomPerson", () => {
    // mock僅重新出現一次
    if (ocur === 0) {
      ocur++;
      return "test1";
    }
    return "test2";
  });
  assert.strictEqual(app.selectNextPerson(), "test2");
  assert.strictEqual(app.selectNextPerson(), null);
  // 恢復所有模擬的方法到其原始狀態
  test.mock.restoreAll();
});

test("Application.notifySelected", async () => {
  const app = new Application();
  app.people = ["test1", "test2"];
  app.selected = ["test1", "test2"];
  // 對MailSystem類的send方法進行模擬
  test.mock.method(MailSystem.prototype, "send");
  app.notifySelected();
  assert.strictEqual(app.mailSystem.send.mock.calls.length, 2);
});