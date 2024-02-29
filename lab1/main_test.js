const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    // TODO
    const myClass = new MyClass();
    const student = new Student();
    student.setName('John');
    myClass.addStudent(student);
    assert.strictEqual(myClass.getStudentById(0), student);
});

test("Test MyClass's getStudentById", () => {
    // TODO
    const myClass = new MyClass();
    const student = new Student();
    student.setName('John');
    myClass.addStudent(student);
    assert.strictEqual(myClass.getStudentById(0), student);
    assert.strictEqual(myClass.getStudentById(999), null);
});

test("Test Student's setName", () => {
    // TODO
    const student = new Student();
    student.setName('John');
    assert.strictEqual(student.getName(), "John");
});

test("Test Student's getName", () => {
    // TODO
    const student = new Student();
    student.setName('John');
    assert.strictEqual(student.getName(), "John");
}); 