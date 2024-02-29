const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    // TODO
    const myClass = new MyClass();
    const student = new Student();

    assert.strictEqual(myClass.addStudent("variable that is not Student"), -1);
    assert.strictEqual(myClass.addStudent(student), myClass.students.length-1);

    // throw new Error("Test not implemented");
});

test("Test MyClass's getStudentById", () => {
    // TODO
    const myClass = new MyClass();
    const student = new Student();
    myClass.addStudent(student);

    assert.strictEqual(myClass.getStudentById(myClass.students.length), null);
    assert.strictEqual(myClass.getStudentById(myClass.students.length - 1), student);
    assert.strictEqual(myClass.getStudentById(0), student);
    assert.strictEqual(myClass.getStudentById(-1), null);

    // throw new Error("Test not implemented");
});

test("Test Student's setName", () => {
    // TODO
    const student = new Student();
    assert.strictEqual(student.setName(123), undefined);

    // throw new Error("Test not implemented");
});

test("Test Student's getName", () => {
    // TODO
    const student = new Student();
    student.setName("John");
    assert.strictEqual(student.getName(), "John");

    const student2 = new Student();
    student2.setName(123);
    assert.strictEqual(student2.getName(), '');

    // throw new Error("Test not implemented");
});