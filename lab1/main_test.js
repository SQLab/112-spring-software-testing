const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    
});

test("Test MyClass's getStudentById", () => {
    
});

test("Test Student's setName", () => {
    let student = new Student();
    student.setName("John");
    assert.strictEqual(student.name, "John");
    student.setName(123);
    assert.strictEqual(student.name, "John");
});

test("Test Student's getName", () => {
    
});