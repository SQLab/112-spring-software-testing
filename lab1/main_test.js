const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');
myclass = new MyClass();
student = new Student();
student.setName('John');

test("Test MyClass's addStudent", () => {
    assert.strictEqual(myclass.addStudent(1), -1);
    assert.strictEqual(myclass.addStudent(student), 0);
});

test("Test MyClass's getStudentById", () => {
    myclass.addStudent(student);
    assert.strictEqual(myclass.getStudentById(0),student);
    assert.strictEqual(myclass.getStudentById(-1),null);
});

test("Test Student's setName", () => {
    assert.strictEqual(student.name,'John');
    myclass.getStudentById(0).setName(12);
    assert.strictEqual(myclass.getStudentById(0).getName(),'John');
});

test("Test Student's getName", () => {
    // TODO
    assert.strictEqual(myclass.getStudentById(0).getName(),student.name);
    student2 = new Student();
    myclass.addStudent(student2);
    assert.strictEqual(myclass.getStudentById(2).getName(),'');
});
