const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    const myClass = new MyClass();
    const student = new Student();
    assert.strictEqual(myClass.addStudent(student), 0);
    assert.strictEqual(myClass.addStudent(123), -1);
});

test("Test MyClass's getStudentById", () => {
    const myClass = new MyClass();
    const student = new Student();
    myClass.addStudent(student);
    assert.strictEqual(myClass.getStudentById(0), student);
    assert.strictEqual(myClass.getStudentById(-1), null);
});

test("Test Student's setName", () => {
    const student = new Student();
    student.setName("John");
    assert.strictEqual(student.getName(), "John");
    student.setName(123);
    assert.strictEqual(student.getName(), "John");
});

test("Test Student's getName", () => {
    const student = new Student();
    assert.strictEqual(student.getName(), "");
    student.setName("John");
    assert.strictEqual(student.getName(), "John");
});