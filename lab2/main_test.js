const { test, mock } = require("node:test");
const assert = require("assert");
const fs = require("node:fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const { Application, MailSystem } = require("./main");

test("Test MailSystem's write", () => {
  const mailSystem = new MailSystem();
  const testResult = mailSystem.write("Chii");
  assert.strictEqual(testResult, "Congrats, Chii!");
});

test("Test MailSystem's send", (t) => {
  const mailSystem = new MailSystem();
  function send() {
    return mailSystem.send("Chii", "Congrats, Chii!");
  }
  const fn = t.mock.fn(send);
  Math.random = () => 0.6;
  assert.strictEqual(fn(), true);
  Math.random = () => 0.4;
  assert.strictEqual(fn(), false);
});

test("Test Application's getNames", async () => {
  const stubFile = "name_list.txt";
  const stubData = "Chii\nHachi\nUsagi";
  await writeFile(stubFile, stubData, "utf8");
  const application = new Application();
  const testResult = await application.getNames();
  assert.deepStrictEqual(testResult, [["Chii", "Hachi", "Usagi"], []]);
  fs.unlinkSync(stubFile);
});

test("Test Application's getRandomPerson", async () => {
  const stubFile = "name_list.txt";
  const stubData = "Chii\nHachi\nUsagi";
  await writeFile(stubFile, stubData, "utf8");
  const application = new Application();
  application.people = ["Chii", "Hachi", "Usagi"];
  const testPerson = application.getRandomPerson();
  assert.ok(application.people.includes(testPerson));
  fs.unlinkSync(stubFile);
});

test("Test Application's  selectNextPerson", async () => {
  const stubFile = "name_list.txt";
  const stubData = "Chii\nHachi\nUsagi";
  await writeFile(stubFile, stubData, "utf8");
  const application = new Application();
  application.people = ["Chii", "Hachi"];

  application.getRandomPerson = () => "Chii";
  assert.strictEqual(application.selectNextPerson(), "Chii");
  application.getRandomPerson = () => "Hachi";
  assert.strictEqual(application.selectNextPerson(), "Hachi");
  assert.strictEqual(application.selectNextPerson(), null);
  let first = 1;
  application.getRandomPerson = () => {
    if (first == 1) {
      first--;
      return "Chii";
    } else return "Hachi";
  };
  application.selected = ["Chii"];
  assert.strictEqual(application.selectNextPerson(), "Hachi");
  fs.unlinkSync(stubFile);
});

test("Test Application's notifySelected", async () => {
  const stubFile = "name_list.txt";
  const stubData = "Chii\nHachi\nUsagi";
  await writeFile(stubFile, stubData, "utf8");
  const application = new Application();
  const getNames = await application.getNames();
  assert.deepStrictEqual(getNames, [["Chii", "Hachi", "Usagi"], []]);

  const mockWrite = test.mock.fn(MailSystem.prototype.write);
  const mockSend = test.mock.fn(MailSystem.prototype.send);

  MailSystem.prototype.write = mockWrite;
  MailSystem.prototype.send = mockSend;

  //No people is selected
  application.selected = [];
  application.notifySelected();

  assert.strictEqual(mockWrite.mock.calls.length, 0);
  assert.strictEqual(mockSend.mock.calls.length, 0);

  //people is selected
  application.selected = ["Chii", "Hachi", "Usagi"];
  application.notifySelected();

  assert.strictEqual(mockWrite.mock.calls.length, 3);
  assert.strictEqual(mockSend.mock.calls.length, 3);
  assert.deepStrictEqual(
    mockWrite.mock.calls.map((call) => call.arguments[0]),
    ["Chii", "Hachi", "Usagi"]
  );
  assert.deepStrictEqual(
    mockSend.mock.calls.map((call) => call.arguments[0]),
    ["Chii", "Hachi", "Usagi"]
  );
  fs.unlinkSync(stubFile);
});
