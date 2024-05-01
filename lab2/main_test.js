const assert = require("assert");
const test = require("node:test");
const { Application, MailSystem } = require("./main");
const fs = require("fs");

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary

const people = ["John", "Rose", "Jade", "Dave", "Jane", "Jake", "Dirk", "Roxy"];

test("Test write", (t) => {
  t.mock.restoreAll();
  // Spy console.log
  t.mock.method(console, "log").mock.mockImplementation(() => {});

  const mailSystem = new MailSystem();

  assert.strictEqual(mailSystem.write("John"), "Congrats, John!");
  assert.strictEqual(
    console.log.mock.calls[0].arguments[0],
    "--write mail for John--"
  );
});

test("Test send", { skip: false }, (t) => {
  t.mock.restoreAll();
  // Spy console.log
  t.mock.method(console, "log").mock.mockImplementation(() => {});

  // Stub Math.random
  t.mock.method(Math, "random").mock.mockImplementationOnce(() => {
    return 1;
  });

  const mailSystem = new MailSystem();

  assert.strictEqual(mailSystem.send("John", "context"), true);
  assert.strictEqual(
    console.log.mock.calls[0].arguments[0],
    "--send mail to John--"
  );
  assert.strictEqual(console.log.mock.calls[1].arguments[0], "mail sent");

  // Stub Math.random again
  t.mock.method(Math, "random").mock.mockImplementationOnce(() => {
    return 0;
  });

  assert.strictEqual(mailSystem.send("John", "context"), false);
  assert.strictEqual(
    console.log.mock.calls[2].arguments[0],
    "--send mail to John--"
  );
  assert.strictEqual(console.log.mock.calls[3].arguments[0], "mail failed");
});

test("Test getNames", async (t) => {
  t.mock.restoreAll();
  filePath = "./name_list.txt";
  fs.writeFileSync(filePath, "John\nRose\nJade\nDave\nJane\nJake\nDirk\nRoxy");

  const spy = t.mock.fn(Application.prototype.getNames);
  const value = await spy();
  fs.unlinkSync(filePath);
  assert.deepStrictEqual(value, [
    ["John", "Rose", "Jade", "Dave", "Jane", "Jake", "Dirk", "Roxy"],
    [],
  ]);
});

test("Test getRandomPerson", async (t) => {
  t.mock.restoreAll();

  // Stub
  t.mock
    .method(Application.prototype, "getNames")
    .mock.mockImplementation(async () => {
      return [people, []];
    });
  const app = new Application();
  await app.getNames();
  for (let i = 0; i < 100; i++) {
    assert.ok(people.includes(app.getRandomPerson()));
  }
});

test("Test selectNextPerson", async (t) => {
  t.mock.restoreAll();

  // Mock
  t.mock
    .method(Application.prototype, "getNames")
    .mock.mockImplementation(async () => {
      return [people, []];
    });
  // Spy console.log
  t.mock.method(console, "log").mock.mockImplementation(() => {});
  const app = new Application();
  await app.getNames();

  for (let i = 0; i < 8; i++) {
    const person = app.selectNextPerson();
    assert.ok(people.includes(person));
    assert.ok(app.selected.includes(person));
    assert.strictEqual(
      console.log.mock.calls[i].arguments[0],
      "--select next person--"
    );
  }
  assert.strictEqual(app.selectNextPerson(), null);
  assert.strictEqual(
    console.log.mock.calls[8].arguments[0],
    "--select next person--"
  );
  assert.strictEqual(console.log.mock.calls[9].arguments[0], "all selected");
});

test("Test notifySelected", async (t) => {
  t.mock.restoreAll();

  // Mock Application
  t.mock
    .method(Application.prototype, "getNames")
    .mock.mockImplementation(async () => {
      return [[], []];
    });

  const mailSystem = new MailSystem();

  // Stub MailSystem
  t.mock.method(mailSystem, "write").mock.mockImplementation(() => {
    return "context";
  });
  t.mock.method(mailSystem, "send").mock.mockImplementation(() => {
    return "send";
  });

  // Spy console.log
  t.mock.method(console, "log").mock.mockImplementation(() => {});

  const app = new Application();
  await app.getNames();
  app.selected = people;
  app.mailSystem = mailSystem;

  app.notifySelected();

  assert.strictEqual(
    console.log.mock.calls[0].arguments[0],
    "--notify selected--"
  );
  assert.strictEqual(mailSystem.write.mock.calls.length, 8);
  assert.strictEqual(mailSystem.send.mock.calls.length, 8);
});
