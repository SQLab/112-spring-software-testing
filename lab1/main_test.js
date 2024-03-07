const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    // Case 0
    let testStudent0 = new Student();
    let testClass0 = new MyClass();
    testStudent0.setName(userName='testStudent');
    assert.strictEqual(testClass0.addStudent(testStudent0), 0);

    // Case 1
    let testStudent1 = null;
    let testClass1 = new MyClass();
    assert.strictEqual(testClass1.addStudent(testStudent1), -1);
});

test("Test MyClass's getStudentById", () => {
    // Case 0
    let testStudent0 = new Student();
    let testClass0 = new MyClass();

    testStudent0.setName(userName='testStudent');
    testClass0.addStudent(testStudent0);

    selectedStudent0 = testClass0.getStudentById(0);
    assert.strictEqual(selectedStudent0.getName(), 'testStudent');

    // Case 1
    selectedStudent1 = testClass0.getStudentById(1);
    assert.strictEqual(selectedStudent1, null);
});

test("Test Student's setName", () => {
    // Case 0
    let testStudent0 = new Student();
    testStudent0.setName(userName='testStudent');
    assert.strictEqual(testStudent0.getName(), 'testStudent');

    // Case 1
    let testStudent1 = new Student();
    testStudent1.setName(userName=123);
    assert.strictEqual(testStudent1.getName(), '');
});

test("Test Student's getName", () => {
    testStudent = new Student();
    testStudent.setName(userName='testStudent');
    assert.strictEqual(testStudent.getName(), 'testStudent');
});