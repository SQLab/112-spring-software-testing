const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName('John');
    assert.strictEqual(myClass.addStudent(student), 0);
    assert.strictEqual(myClass.addStudent(123), -1);
});

test("Test MyClass's getStudentById", () => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName('John');
    const newStudentId = myClass.addStudent(student);
    assert.strictEqual(myClass.getStudentById(newStudentId), student);
    assert.strictEqual(myClass.getStudentById(-2), null);
    assert.strictEqual(myClass.getStudentById(2), null);
});

test("Test Student's setName", () => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName('John');
    assert.strictEqual(student.name, 'John');
    student.setName(123);
});

test("Test Student's getName", () => {
    const myClass = new MyClass();
    const student = new Student();
    assert.strictEqual(student.getName(), '');
    student.setName('John');
    assert.strictEqual(student.getName(), 'John');
});