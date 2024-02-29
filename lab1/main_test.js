const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    const myClass = new MyClass();
    // if student is not an instance of Student, return -1
    assert.strictEqual(myClass.addStudent({}), -1);

    // normal case
    const names = ['John', 'Jane', 'Doe', 'Smith'];
    names.forEach(name => {
        const student = new Student();
        student.setName(name);
        const newStudentId = myClass.addStudent(student);
        const newStudentName = myClass.getStudentById(newStudentId).getName();
        assert.strictEqual(newStudentName, name);
    });
});

test("Test MyClass's getStudentById", () => {
    // TODO
    throw new Error("Test not implemented");
});

test("Test Student's setName", () => {
    // TODO
    throw new Error("Test not implemented");
});

test("Test Student's getName", () => {
    // TODO
    throw new Error("Test not implemented");
});