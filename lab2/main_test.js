const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');
const fs = require('fs');

const createSpy = () => {
    const calls = [];
    const spy = (...args) => {
        calls.push(args);
    };
    spy.calls = calls;
    return spy;
};

test("Test MailSystem's write", (t) => {
    console.log = createSpy();
	const system = new MailSystem();
	assert.strictEqual(system.write("Alice"), "Congrats, Alice!");
    assert.strictEqual(console.log.calls[0][0], "--write mail for Alice--");
});

test("Test MailSystem's send", (t) => {
    console.log = createSpy();
	const system = new MailSystem();
	const fn = t.mock.fn(system.send);

	// case success
	t.mock.method(Math, 'random', () =>0.7);
	assert.strictEqual(fn("Alice", "hi"), true);
    assert.strictEqual(console.log.calls[0][0], "--send mail to Alice--");
	// case fail
	t.mock.method(Math, 'random', () =>0.4);
	assert.strictEqual(fn("Alice", "hi"), false);
    assert.strictEqual(console.log.calls[0][0], "--send mail to Alice--");

	t.mock.reset();
});

test("Test Application's getNames", async (t) => {
	  fs.writeFile('name_list.txt', 'name1\nname2\nname3', () =>{});

	  const app = new Application();
	  const fn = t.mock.fn(app.getNames);
	  let [people, selected] = await fn();
	  assert.deepStrictEqual(people, ['name1', 'name2', 'name3']);

	  fs.unlink('name_list.txt', () =>{});
});

test("Test Applicaiton getRandomPerson", (t) => {
	fs.writeFile('name_list.txt', 'name1\nname2\nname3', () =>{});

    const app = new Application(); 
    app.people = ['name1', 'name2', 'name3'];

	t.mock.method(Math, 'random', () =>0);
	assert.strictEqual(app.getRandomPerson(), 'name1');

	t.mock.reset();
});

test("Test Applicaiton selectNextPerson", (t) => {

	const app = new Application(); 
	app.people = ['name1', 'name2', 'name3'];
	t.mock.method(app, 'getRandomPerson', () =>'name1');
	assert.strictEqual(app.selectNextPerson(), 'name1');

	t.mock.method(app, 'getRandomPerson', () =>'name2');
	assert.strictEqual(app.selectNextPerson(), 'name2');

	t.mock.method(app, 'getRandomPerson', () =>'name3');
	assert.strictEqual(app.selectNextPerson(), 'name3');

	assert.strictEqual(app.selectNextPerson(), null);

    let cnt = "";
	t.mock.method(app, 'getRandomPerson', () =>{
        cnt += 1;
        return "name" + cnt;
	});
	app.selected = ["name1"];
	assert.strictEqual(app.selectNextPerson(), 'name11');

	t.mock.reset();
});

test("Test Applicaiton notifySelected", async () => {
    console.log = createSpy();
	const app = new Application(); 
	app.selected = ["name1"];
	assert.strictEqual(app.notifySelected(), undefined);
    assert.strictEqual(console.log.calls[0][0], "--notify selected--");
    assert.strictEqual(console.log.calls[1][0], "--write mail for name1--");
    assert.strictEqual(console.log.calls[2][0], "--send mail to name1--");
    
	fs.unlink('name_list.txt', () =>{});
});