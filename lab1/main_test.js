const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    // TODO
    const studentInstance = new Student();
    const classInstance = new MyClass();
    assert.strictEqual(classInstance.addStudent(studentInstance), 0);
    assert.strictEqual(classInstance.addStudent(1), -1);
    // throw new Error("Test not implemented");
});

test("Test MyClass's getStudentById", () => {
    // TODO
    const studentInstance = new Student();
    const classInstance = new MyClass();
    classInstance.addStudent(studentInstance);
    assert.strictEqual(classInstance.getStudentById(-1), null);
    assert.strictEqual(classInstance.getStudentById(1), null);
    assert.deepStrictEqual(classInstance.getStudentById(0), studentInstance);
    // throw new Error("Test not implemented");
});

test("Test Student's setName", () => {
    // TODO
    const studentInstance = new Student();
    studentInstance.setName(1);
    assert.deepStrictEqual(studentInstance.name, undefined);
    studentInstance.setName('a');
    assert.strictEqual(studentInstance.name, 'a');
    // throw new Error("Test not implemented");
});

test("Test Student's getName", () => {
    // TODO
    const studentInstance = new Student();
    assert.strictEqual(studentInstance.getName(), '');
    studentInstance.setName('b');
    assert.strictEqual(studentInstance.getName(), 'b');
    // throw new Error("Test not implemented");
});