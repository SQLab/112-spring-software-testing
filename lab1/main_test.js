const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    const myClass = new MyClass();
    assert.equal(myClass.addStudent(69), -1);
    const student = new Student();
    const name = "John";
    student.setName(name);
    myClass.addStudent(student);
});

test("Test MyClass's getStudentById", () => {
    const myClass = new MyClass();
    const student = new Student();
    const name = "John";
    student.setName(name);
    const id = myClass.addStudent(student);
    assert.strictEqual(myClass.getStudentById(-1), null);
    assert.strictEqual(myClass.getStudentById(50), null);
    assert.strictEqual(myClass.getStudentById(id), student);
});

test("Test Student's setName", () => {
    const student = new Student();
    student.setName(69);
    student.setName("John");
});

test("Test Student's getName", () => {
    const student = new Student();
    const name = "John"
    assert.equal(student.getName(), '');
    student.setName(name);
    assert.strictEqual(student.getName(), name);
});