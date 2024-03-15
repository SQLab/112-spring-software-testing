const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

const myClass = new MyClass();

test("Test MyClass's addStudent", () => {
    assert.strictEqual(myClass.addStudent(null), -1);
    assert.strictEqual(myClass.addStudent(new Student()), 0);
});

test("Test MyClass's getStudentById", () => {
    assert.strictEqual(myClass.getStudentById(0) instanceof Student, true);
    assert.strictEqual(myClass.getStudentById(1), null);
});

test("Test Student's setName", () => {
    const student = myClass.getStudentById(0);
    student.setName('John');
    assert.strictEqual(student.getName(), 'John');

    student.setName(null);
    assert.strictEqual(student.getName(), 'John');
});

test("Test Student's getName", () => {
    const student = new Student();
    const name = student.getName();

    assert.strictEqual(name, '');
});