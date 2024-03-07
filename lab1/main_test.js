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
    const name = "std1";
    student.setName(0);
    assert.strictEqual(student.name, undefined);
    student.setName(name);
    assert.strictEqual(student.name, name);
});

test("Test Student's getName", () => {
    // TODO
    const student = new Student();
    const name = "std1";
    student.setName(100);
    assert.strictEqual(student.getName(), "");
    student.setName(name);
    assert.strictEqual(student.getName(), name);
});
