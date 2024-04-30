const fs = require("fs");
const test = require("node:test");
const assert = require("assert");

test.mock.method(fs, "readFile", (path, encoding, callback) => {
  callback(null, "test1\ntest2");
});
const { Application, MailSystem } = require("./main");

test("MailSystem.write", () => {
  const mailSystem = new MailSystem();
  assert.strictEqual(mailSystem.write("test"), "Congrats, test!");
});

test("MailSystem.send", () => {
  const mailSystem = new MailSystem();
  test.mock.method(Math, "random", () => 1);
  assert.strictEqual(mailSystem.send("test", "test_success"), true);
  test.mock.method(Math, "random", () => 0);
  assert.strictEqual(mailSystem.send("test", "test_fail"), false);
  test.mock.restoreAll();
});

test("Application.getNames", async () => {
  const app = new Application();
  const [people, selected] = await app.getNames();
  assert.deepStrictEqual(people, ["test1", "test2"]);
  assert.deepStrictEqual(selected, []);
});

test("Application.getRandomPerson", async () => {
  test.mock.method(Application.prototype, "getNames", async () => [
    ["test1", "test2"],
    [],
  ]);
  const app = new Application();
  console.log(await app.getNames()); // only use for wait constructor
  test.mock.method(Math, "random", () => 0);
  assert.strictEqual(app.getRandomPerson(), "test1");
  test.mock.method(Math, "random", () => 0.99);
  assert.strictEqual(app.getRandomPerson(), "test2");
  test.mock.restoreAll();
});

test("Application.selectNextPerson", async () => {
  const app = new Application();
  app.people = ["test1", "test2"];
  app.selected = ["test1"];
  let ocur = 0;
  test.mock.method(app, "getRandomPerson", () => {
    // mock only reoccurs once
    if (ocur === 0) {
      ocur++;
      return "test1";
    }
    return "test2";
  });
  assert.strictEqual(app.selectNextPerson(), "test2");
  assert.strictEqual(app.selectNextPerson(), null);
  test.mock.restoreAll();
});

test("Application.notifySelected", async () => {
  // using spy to see the number of send called
  const app = new Application();
  app.people = ["test1", "test2"];
  app.selected = ["test1", "test2"];
  test.mock.method(MailSystem.prototype, "send");
  app.notifySelected();
  assert.strictEqual(app.mailSystem.send.mock.calls.length, 2);
});
