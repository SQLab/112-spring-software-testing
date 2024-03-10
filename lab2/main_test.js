const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary
const fs = require('fs');


test("Test MailSystem's write", () => {
	const system = new MailSystem();
	assert.strictEqual(system.write("Tom"), "Congrats, Tom!");
});

test("Test MailSystem's send", (t) => {
	const system = new MailSystem();
	const fn = t.mock.fn(system.send);
	
	// case success
	t.mock.method(Math, 'random', () =>0.7);
	assert.strictEqual(fn("Tom", "hi"), true);
	// case fail
	t.mock.method(Math, 'random', () =>0.4);
	assert.strictEqual(fn("Tom", "hi"), false);
	
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

	// for while-loop
	let firstTime = true;
	t.mock.method(app, 'getRandomPerson', () =>{
		if(firstTime)
		{
			firstTime = false;
			return "name1";
		}
		else
		{
			return "name2";
		}
	});
	app.selected = ["name1"];
	app.selectNextPerson();

	t.mock.reset();
});

test("Test Applicaiton notifySelected", () => {
	const app = new Application(); 
	app.selected = ["name1"];
	assert.strictEqual(app.notifySelected(), undefined);
	fs.unlink('name_list.txt', () =>{});
});

