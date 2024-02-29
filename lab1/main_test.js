const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
	const mc = new MyClass();
	const st = new Student();
	assert.strictEqual(mc.addStudent(mc), -1); // not Student class
	assert.strictEqual(mc.addStudent(st), 0); // 1 students
	assert.strictEqual(mc.addStudent(st), 1); // 2 students
});

test("Test MyClass's getStudentById", () => {
	const mc = new MyClass();
	
	const st1 = new Student();
	st1.setName("st1");
	const st2 = new Student();
	st2.setName("st2");
	mc.addStudent(st1);
	mc.addStudent(st2);
	
	assert.strictEqual(mc.getStudentById(-1), null); // id < 0
	assert.strictEqual(mc.getStudentById(2), null); // id >= length
	assert.strictEqual(mc.getStudentById(0), st1); // st1
	assert.strictEqual(mc.getStudentById(1), st2); // st2
});

test("Test Student's setName", () => {
	const st1 = new Student();
	st1.setName("st1");
	const st2 = new Student();
	st2.setName(1);
	
	assert.strictEqual(st1.name, "st1"); // st1
	assert.strictEqual(st2.name, undefined); // st2 not a string
});

test("Test Student's getName", () => {
	const st1 = new Student();
	st1.setName("st1");
	const st2 = new Student();
	
	assert.strictEqual(st1.getName(), "st1"); // st1
	assert.strictEqual(st2.getName(), ''); // st2
});

