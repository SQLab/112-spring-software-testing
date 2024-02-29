const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    // Case 0
    let testStudent = new Student();
    let testClass = new MyClass();
    testStudent.setName(userName='testStudent');
    assert.strictEqual(testClass.addStudent(testStudent), 0);
    // throw new Error("Test not implemented");
});

test("Test MyClass's getStudentById", () => {
    let testStudent = new Student();
    let testClass = new MyClass();

    testStudent.setName(userName='testStudent');
    testClass.addStudent(testStudent);

    selectedStudent = testClass.getStudentById(0);
    assert.strictEqual(selectedStudent.getName(), 'testStudent');
    // throw new Error("Test not implemented");
});

test("Test Student's setName", () => {
    testStudent = new Student();
    testStudent.setName(userName='testStudent');
    assert.strictEqual(testStudent.getName(), 'testStudent');
    //throw new Error("Test not implemented");
});

test("Test Student's getName", () => {
    testStudent = new Student();
    testStudent.setName(userName='testStudent');
    assert.strictEqual(testStudent.getName(), 'testStudent');
    //throw new Error("Test not implemented");
});