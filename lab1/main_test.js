const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    // TODO
    const myClass = new MyClass();
    const student = new Student();
    student.setName('SUNGOD');
    assert.strictEqual(myClass.addStudent(student), 0);
    const student2 = new Student();
    student2.setName('');
    assert.strictEqual(myClass.addStudent(student2), 1);
    assert.strictEqual(myClass.addStudent(student2), 2);
    assert.strictEqual(myClass.addStudent('YJ'), -1);
    assert.strictEqual(myClass.addStudent(0), -1);
    assert.strictEqual(myClass.addStudent(), -1);
    //throw new Error("Test not implemented");
});

test("Test MyClass's getStudentById", () => {
    // TODO
    const myClass = new MyClass();
    const student = new Student();
    student.setName('SUNGOD');
    const newStudentId = myClass.addStudent(student);
    assert.strictEqual(myClass.getStudentById(newStudentId), student);
    //testing fail
    //assert.strictEqual(myClass.getStudentById('John'), null);
    assert.strictEqual(myClass.getStudentById(-1), null);
    //throw new Error("Test not implemented");
});

test("Test Student's setName", () => {
    // TODO
    const myClass = new MyClass();
    const student = new Student();
    student.setName('SUNGOD');
    assert.strictEqual(student.name, 'SUNGOD');
    student.setName(123); //wrong type
    assert.strictEqual(student.name, 'SUNGOD');
    //throw new Error("Test not implemented");
});

test("Test Student's getName", () => {
    // TODO
    const myClass = new MyClass();
    const student = new Student();
    assert.strictEqual(student.getName(), '');
    student.setName('SUNGOD');
    assert.strictEqual(student.getName(), 'SUNGOD');
    //throw new Error("Test not implemented");
});