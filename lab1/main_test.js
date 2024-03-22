const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    // TODO
    const myClass = new MyClass();
    const names = ["John", "Doe", "Jane", "Doe"];
    names.forEach(name => {
        const student = new Student();
        student.setName(name);
        assert.strictEqual(myClass.addStudent(student), myClass.students.length - 1);
    });
    assert.strictEqual(myClass.addStudent({}), -1);
    //throw new Error("Test not implemented");
});

test("Test MyClass's getStudentById", () => {
    // TODO
    const myClass = new MyClass();
    const names = ["John", "Doe", "Jane", "Doe"];
    names.forEach(name => {
        const student = new Student();
        student.setName(name);
        myClass.addStudent(student);
        assert.strictEqual(myClass.getStudentById(myClass.students.length - 1).getName(), name);
    });
    assert.strictEqual(myClass.getStudentById(-1), null);
    assert.strictEqual(myClass.getStudentById(myClass.students.length), null);
    //throw new Error("Test not implemented");
});

test("Test Student's setName", () => {
    // TODO
    const student = new Student();
    student.setName("John");
    assert.strictEqual(student.getName(), "John");
    student.setName(123);
    assert.strictEqual(student.getName(), "John");
    //throw new Error("Test not implemented");
});

test("Test Student's getName", () => {
    // TODO
    const student = new Student();
    assert.strictEqual(student.getName(), "");
    student.setName("John");
    assert.strictEqual(student.getName(), "John");

    //throw new Error("Test not implemented");
});