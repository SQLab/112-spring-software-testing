const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    // TODO
    const myClass = new MyClass();
    assert.strictEqual(myClass.addStudent(1), -1);
    const student = new Student();
    student.setName('John');
    assert.strictEqual(myClass.addStudent(student), 0);
    assert.strictEqual(myClass.getStudentById(0), student);
});

test("Test MyClass's getStudentById", () => {
    // TODO
    const myClass = new MyClass();
    const student = new Student();
    student.setName('John');
    myClass.addStudent(student);
    assert.strictEqual(myClass.getStudentById(0), student);
    assert.strictEqual(myClass.getStudentById(myClass.students.length), null);
    assert.strictEqual(myClass.getStudentById(-1), null);
});

test("Test Student's setName", () => {
    // TODO
    const student = new Student();
    assert.strictEqual(student.setName(123), undefined);
    assert.strictEqual(student.getName(), '');
    student.setName('John');
    assert.strictEqual(student.getName(), "John");
});

test("Test Student's getName", () => {
    // TODO
    const student = new Student();
    assert.strictEqual(student.getName(), '');
    student.setName('John');
    assert.strictEqual(student.getName(), "John");
}); 