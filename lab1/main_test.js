const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    // TODO
    const myclass = new MyClass();
    const student = new Student();
    assert.strictEqual(myclass.addStudent(student),0);
    assert.strictEqual(myclass.addStudent(), -1);
    // throw new Error("Test not implemented");
});

test("Test MyClass's getStudentById", () => {
    // TODO
    const myclass = new MyClass();
    const student = new Student();
    student.setName('John');
    myclass.addStudent(student);
    assert.strictEqual(myclass.getStudentById(0),student);
    assert.ifError(myclass.getStudentById(-1));
    // throw new Error("Test not implemented");
});

test("Test Student's setName", () => {
    // TODO
    const student = new Student();
    assert.ifError(student.setName(-1));
    // throw new Error("Test not implemented");
});

test("Test Student's getName", () => {
    // TODO
    const student = new Student();
    student.setName("Jim");
    assert.strictEqual(student.getName(),"Jim");
    const student2 = new Student();
    assert.strictEqual(student2.getName(),'');
    // throw new Error("Test not implemented");
});