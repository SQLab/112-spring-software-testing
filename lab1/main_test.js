const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    //TODO
    const myclass = new MyClass();
    const student = new Student();
    assert.strictEqual(myclass.addStudent(""), -1);
    assert.strictEqual(myclass.addStudent(student), 0);
});

test("Test MyClass's getStudentById", () => {
    // TODO
    const myclass = new MyClass();
    const student1 = new Student();
    myclass.addStudent(student1);
    assert.strictEqual(myclass.getStudentById(-1), null);
    assert.strictEqual(myclass.getStudentById(100), null);
    assert.strictEqual(myclass.getStudentById(0), student1);
    
});

test("Test Student's setName", () => {
    // TODO
    const student = new Student();
    assert.strictEqual(student.name, undefined);
    student.setName("std1");
    assert.strictEqual(student.name, "std1");
});

test("Test Student's getName", () => {
    // TODO
    const student = new Student();
    assert.strictEqual(student.getName(), '');
    student.setName("std1");
    assert.strictEqual(student.getName(), "std1");
});