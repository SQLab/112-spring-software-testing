const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    let class1 = new MyClass();
    assert.strictEqual(class1.addStudent(123), -1);
    let student = new Student();
    assert.strictEqual(class1.addStudent(student), 0);
});

test("Test MyClass's getStudentById", () => {
    let class1 = new MyClass();
    let student = new Student();
    class1.addStudent(student);
    assert.strictEqual(class1.getStudentById(-1), null);
    assert.strictEqual(class1.getStudentById(0), student);
});

test("Test Student's setName", () => {
    let student = new Student();
    student.setName("John");
    assert.strictEqual(student.name, "John");
    student.setName(123);
    assert.strictEqual(student.name, "John");
});

test("Test Student's getName", () => {
    let student = new Student();
    assert.strictEqual(student.getName(), "");
    student.setName("John");
    assert.strictEqual(student.getName(), "John");
});