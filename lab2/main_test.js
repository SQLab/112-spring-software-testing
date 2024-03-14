const {mock, test} = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');

const fs = require("fs");
const util = require('util');
const readFile = util.promisify(fs.readFile);

const data = 'Apple\nBanana\nCockroach';

test("Test MailSystem's write", () => {
	const ms1 = new MailSystem();
	const ms2 = new MailSystem();
	const name1 = "Dinosaur";
	const name2 = "Pisa";
	
	assert.strictEqual(ms1.write(name1), "Congrats, Dinosaur!");
	assert.strictEqual(ms2.write(name2), "Congrats, Pisa!");
});

test("Test MailSystem's send", () => {
	const ms = new MailSystem();
	const name = "Pisa";
	const context = "Congrats, Pisa!";
	const OriginalMathRandom = Math.random;
	
	// Mock
	test.mock.method(Math, "random", () => 0.6); // Let Math.random() always return 0.6
	assert.strictEqual(ms.send(name, context), true);
	test.mock.method(Math, "random", () => 0.4); // Let Math.random() always return 0.4
	assert.strictEqual(ms.send(name, context), false);
	
	// Reset Math.random
	Math.random = OriginalMathRandom;
});

test("Test Application's getNames", async () => {
	
	await fs.writeFile('name_list.txt', data, 'utf8', (err) => {
		if (err) {
			console.log(err);
		}
		console.log("Write file success");
	});
	const ap = new Application();
	const [people, selected] = await ap.getNames();
	assert.deepStrictEqual(people, ['Apple', 'Banana', 'Cockroach']);
	assert.deepStrictEqual(selected, []);
});

test("Test Application's getRandomPerson", async () => {
	const OriginalMathRandom = Math.random;
	
	await fs.writeFile('name_list.txt', data, 'utf8', (err) => {
		if (err) {
			console.log(err);
		}
		console.log("Write file success");
	});
	
	const ap = new Application();
	const [people, selected] = await ap.getNames();
	
	// Mock
	test.mock.method(Math, "random", () => 0.1); // Let Math.random() always return 0.1
	assert.strictEqual(ap.getRandomPerson(), 'Apple'); // floor(0.1*3) = 0
	
	test.mock.method(Math, "random", () => 0.4);  // Let Math.random() always return 0.4
	assert.strictEqual(ap.getRandomPerson(), 'Banana'); // floor(0.4*3) = 1
	
	test.mock.method(Math, "random", () => 0.8); // Let Math.random() always return 0.8
	assert.strictEqual(ap.getRandomPerson(), 'Cockroach'); // floor(0.8*3) = 2
	
	// Reset Math.random
	Math.random = OriginalMathRandom;
});

test("Test Application's selectNextPerson", () => {
	const ap = new Application();
	
	// Stub
	ap.people = ['Apple', 'Banana', 'Cockroach'];
	ap.selected = ['Apple', 'Banana'];
	assert.strictEqual(ap.selectNextPerson(), 'Cockroach');
	assert.strictEqual(ap.selectNextPerson(), null);
});

test("Test Application's notifySelected", () => {
	const ap = new Application();
	
	// Stub
	ap.people = ['Apple', 'Banana', 'Cockroach'];
	ap.selected = ['Apple', 'Banana'];
	
	// Mock
	const ms_wr = mock.method(ap.mailSystem, "write");
	const ms_se = mock.method(ap.mailSystem, "send");
	
	var st = "";
	mock.method(console, 'log', (s) => {
		st += s + "\n";
	});
	test.mock.method(Math, "random", () => 0.9);
	ap.notifySelected();
	assert.strictEqual(ms_wr.mock.calls.length, ap.selected.length);
	assert.strictEqual(ms_se.mock.calls.length, ap.selected.length);
	
	assert.strictEqual(st, "--notify selected--\n--write mail for Apple--\n--send mail to Apple--\nmail sent\n--write mail for Banana--\n--send mail to Banana--\nmail sent\n");
});
