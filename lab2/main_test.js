const fs = require("fs");
const test = require("node:test");
const assert = require("assert");

test.mock.method(fs, "readFile", (path, encoding, callback) => {
    callback(null, "Apple\nBanana\nCockroach");
});

const { Application, MailSystem } = require("./main");

test("Test MailSystem's write", () => {
	const ms1 = new MailSystem();
	const ms2 = new MailSystem();
	const name1 = "Dinosaur";
	const name2 = "Pisa";
	
	assert.strictEqual(ms1.write(name1), "Congrats, Dinosaur!");
	assert.strictEqual(ms2.write(name2), "Congrats, Pisa!");
	assert.strictEqual(ms2.write(87), "Congrats, 87!");
	assert.strictEqual(ms2.write(true), "Congrats, true!");
});

test("Test MailSystem's send", () => {
	const ms = new MailSystem();
	const mock_fn = test.mock.fn(ms.send);
	const OriginalMathRandom = Math.random;
	const name = "Pisa";
	const context = "Congrats, Pisa!";
	
	// Mock
	test.mock.method(Math, "random", () => 0.6); // Let Math.random() always return 0.6
	assert.strictEqual(mock_fn(name, context), true);
	test.mock.method(Math, "random", () => 0.4); // Let Math.random() always return 0.4
	assert.strictEqual(mock_fn(name, context), false);
	
	// Reset Math.random
	Math.random = OriginalMathRandom;
});

test("Test Application's getNames", async () => {
	const ap = new Application();
	const [people, selected] = await ap.getNames();
	assert.deepStrictEqual(people, ['Apple', 'Banana', 'Cockroach']);
	assert.deepStrictEqual(selected, []);
});

test("Test Application's getRandomPerson", async () => {
	const OriginalMathRandom = Math.random;
	
	const ap = new Application();
	ap.people = ['Apple', 'Banana', 'Cockroach'];
	
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
	ap.selected = ['Apple'];
	let i = 0;
	test.mock.method(ap, 'getRandomPerson', () => {
		if (i == 0) {
			i++;
			return 'Apple';
		}
		else if (i == 1) {
			i++;
			return 'Banana';
		}
		else{
			return 'Cockroach';
		}
	})
	assert.strictEqual(ap.selectNextPerson(), 'Banana');
	assert.deepStrictEqual(ap.selected, ['Apple', 'Banana']);
	
	assert.strictEqual(ap.selectNextPerson(), 'Cockroach');
	assert.deepStrictEqual(ap.selected, ['Apple', 'Banana', 'Cockroach']);
	
	assert.strictEqual(ap.selectNextPerson(), null);
});

test("Test Application's notifySelected", () => {
	const ap = new Application();
	
	// Stub
	ap.people = ['Apple', 'Banana', 'Cockroach'];
	ap.selected = ['Apple', 'Banana', 'Cockroach'];
	
	// Mock
	ap.mailSystem.send = test.mock.fn(ap.mailSystem.send);
	ap.mailSystem.write = test.mock.fn(ap.mailSystem.write);
	ap.notifySelected();
	assert.strictEqual(ap.mailSystem.send.mock.calls.length, 3);
	assert.strictEqual(ap.mailSystem.write.mock.calls.length, 3);
});
