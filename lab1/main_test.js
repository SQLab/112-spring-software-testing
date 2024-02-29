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
    const myClass = new MyClass();
    // if id is less than 0, return null
    assert.strictEqual(myClass.getStudentById(-1), null);

    // normal case
    const names = ['John', 'Jane', 'Doe', 'Smith'];
    names.forEach(name => {
        const student = new Student();
        student.setName(name);
        const newStudentId = myClass.addStudent(student);
        const newStudent = myClass.getStudentById(newStudentId);
        assert.strictEqual(student, newStudent);
    });
    // if id is greater than or equal to the length of students, return null
    assert.strictEqual(myClass.getStudentById(names.length), null);
});

test("Test Student's setName", () => {
    // TODO
    throw new Error("Test not implemented");
});

test("Test Student's getName", () => {
    // TODO
    throw new Error("Test not implemented");
});