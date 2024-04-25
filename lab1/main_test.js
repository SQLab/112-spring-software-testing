const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    // TODO
    const myClass = new MyClass();
    const student = new Student();
    const name="Daniel";
    student.name=name;
    assert.strictEqual(myClass.addStudent(student),0);
    assert.strictEqual(myClass.addStudent("Daniel"),-1);
    //throw new Error("Test not implemented");
});

test("Test MyClass's getStudentById", () => {
    // TODO
    const myClass = new MyClass();
    const student = new Student();
    const name="Daniel";
    student.name=name;
    myClass.students.push(student);
    assert.strictEqual(myClass.getStudentById(0).name,"Daniel");
    assert.strictEqual(myClass.getStudentById(1),null);
    //throw new Error("Test not implemented");
});

test("Test Student's setName", () => {
    // TODO
    const student = new Student();
    const name="Daniel";
    student.setName(name);
    assert.strictEqual(student.name,"Daniel");
    student.setName(123);
    assert.strictEqual(student.name,"Daniel");
    //throw new Error("Test not implemented");
});

test("Test Student's getName", () => {
    // TODO
    const student = new Student();
    const name="Daniel";
    student.name=name;
    assert.strictEqual(student.getName(),"Daniel");
    student.name=undefined;
    assert.strictEqual(student.getName(),"");
    //throw new Error("Test not implemented");
});