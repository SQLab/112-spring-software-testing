const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    // TODO
    const myClass = new MyClass();
    const student = new Student();
    assert.strictEqual(myClass.addStudent(1),-1);
    assert.strictEqual(myClass.addStudent(student),0);
    //throw new Error("Test not implemented");
});

test("Test MyClass's getStudentById", () => {
    // TODO
    const myClass = new MyClass();
    const student = new Student();
    student.setName("stu");
    myClass.addStudent(student);
    assert.strictEqual(myClass.getStudentById(0),student);
    assert.strictEqual(myClass.getStudentById(1),null);

    //throw new Error("Test not implemented");
});

test("Test Student's setName", () => {

    const student = new Student();
    assert.strictEqual(student.setName("stu"),undefined);
    assert.strictEqual(student.getName(),"stu");
    assert.strictEqual(student.setName(123),undefined);
    // TODO
    //throw new Error("Test not implemented");
});

test("Test Student's getName", () => {
    const student = new Student();
    assert.strictEqual(student.getName(),'');
    student.setName("stu");
    assert.strictEqual(student.getName(),"stu");
    // TODO
    //throw new Error("Test not implemented");
});