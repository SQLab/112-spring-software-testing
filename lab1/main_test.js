const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    // TODO
    const myClass = new MyClass();
    const student = new Student();
    const name="Daniel";
    student.setName(name);
    assert.strictEqual(myClass.addStudent(student),1);
    throw new Error("Test not implemented");
});

test("Test MyClass's getStudentById", () => {
    // TODO
    const myClass = new MyClass();
    const student = new Student();
    const name="Daniel";
    student.setName(name);
    const newStudentId=myClass.addStudent(student);
    assert.strictEqual(myClass.getStudentById(newStudentId).getName(),"Daniel");
    throw new Error("Test not implemented");
});

test("Test Student's setName", () => {
    // TODO
    const myClass = new MyClass();
    const student = new Student();
    const name="Daniel";
    student.setName(name);
    assert.strictEqual(student.name,"Daniel");
    throw new Error("Test not implemented");
});

test("Test Student's getName", () => {
    // TODO
    const myClass = new MyClass();
    const student = new Student();
    const name="Daniel";
    student.name=name;
    assert.strictEqual(student.getName(),"Daniel")
    throw new Error("Test not implemented");
});