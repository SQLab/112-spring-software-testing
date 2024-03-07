const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    const student = new Student();
    const class1 = new MyClass();
    const class2 = new MyClass();
    const ret1 = class1.addStudent(12345);
    const ret2 = class2.addStudent(student);
    assert.strictEqual(ret1, -1, "addStudent failed, return value should be -1");
    assert.strictEqual(ret2, 0, "addStudent failed, return value should be 0");
});

test("Test MyClass's getStudentById", () => {
    const student = new Student();
    const name1 = 'Jane';
    student.setName(name1);
    const class1 = new MyClass();
    const ret1 = class1.getStudentById(-1);
    class1.addStudent(student);
    const ret2 = class1.getStudentById(0).name;
    assert.strictEqual(ret1, null, "getStudentById failed, return value should be null");
    assert.strictEqual(ret2, name1, "getStudentById failed, return value should be Jane");
});

test("Test Student's setName", () => {
    const name1 = 'Jane';
    const student1 = new Student();
    const student2 = new Student();
    student1.setName(name1);
    student2.setName(12345);
    assert.strictEqual(student1.name, name1, "setName failed");
    assert.strictEqual(student2.name, undefined, "setName failed");
});

test("Test Student's getName", () => {
    const student1 = new Student();
    const ret_str1 = student1.getName();

    const student2 = new Student();
    const name = 'Jane';
    student2.setName(name);
    const ret_str2 = student2.getName();

    assert.strictEqual(ret_str1, '', "getName failed, should be empty");
    assert.strictEqual(ret_str2, name, "getName failed, should be Jane");
});