const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    // TODO
    //throw new Error("Test not implemented");
	const myClass = new MyClass();
	const names = ['John', 'Jane', 'Doe', 'Smith'];
	let i = 0;
	
	// test vaild case
	names.forEach(name => {
		const student = new Student();
		student.setName(name);
		const newStudentId = myClass.addStudent(student);
		assert.strictEqual(newStudentId, i);
		i = i + 1;
	});
	
	// test invalid case
	assert.strictEqual(myClass.addStudent(13), -1);
	
});

test("Test MyClass's getStudentById", () => {
    // TODO
    //throw new Error("Test not implemented");
	const myClass = new MyClass();
	const names = ['John', 'Jane', 'Doe', 'Smith'];
	let i = 0;
	
	// test vaild case
	names.forEach(name => {
		const student = new Student();
		student.setName(name);
		myClass.addStudent(student);
		assert.strictEqual(myClass.getStudentById(i), student);
		i = i + 1;
	});
	
	// test invalid case
	assert.strictEqual(myClass.getStudentById(-100), null);
	assert.strictEqual(myClass.getStudentById(100), null);
});

test("Test Student's setName", () => {
    // TODO
    //throw new Error("Test not implemented");
	const myClass = new MyClass();
	const names = ['John', 'Jane', 'Doe', 'Smith'];
	names.forEach(name => {
		const student = new Student();
		student.setName(name);
		assert.strictEqual(student.getName(), name);
	});
	
	const student = new Student();
	assert.strictEqual(student.setName(12345), undefined);

});

test("Test Student's getName", () => {
    // TODO
    //throw new Error("Test not implemented");
	const myClass = new MyClass();
	const names = ['John', 'Jane', 'Doe', 'Smith'];
	names.forEach(name => {
		const student = new Student();
		student.setName(name);
		assert.strictEqual(student.getName(), name);
	});
	
	const student = new Student();
	assert.strictEqual(student.getName(), '');
});