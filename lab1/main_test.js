const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    const myClass = new MyClass();
    const student = new Student();
    assert.strictEqual(myClass.addStudent(student), myClass.students.length - 1);
    assert.strictEqual(myClass.addStudent(1), -1);
   
    
});

test("Test MyClass's getStudentById", () => {
    const myClass = new MyClass();
    const student = new Student();
    assert.strictEqual(myClass.getStudentById(-1), null);
    assert.strictEqual(myClass.getStudentById(myClass.students.length), null);
    myClass.addStudent(student);
    assert.strictEqual(myClass.getStudentById(0), student);

});

test("Test Student's setName", () => {
    const student = new Student();
    student.setName(1);
    assert.strictEqual(student.name, undefined);
    student.setName("John");
    assert.strictEqual(student.name, "John");
});

test("Test Student's getName", () => {
    const student = new Student();
    assert.strictEqual(student.getName(), '');
    student.setName("John");
    assert.strictEqual(student.getName(), "John");
});