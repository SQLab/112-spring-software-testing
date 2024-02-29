const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    // TODO
    const myClass = new MyClass();
    //check fail case
    assert.strictEqual(myClass.addStudent({}), -1);
    //check success case
    assert.strictEqual(myClass.addStudent(new Student), 0);

});

test("Test MyClass's getStudentById", () => {
    // TODO
    const myClass = new MyClass();
    assert.strictEqual(myClass.getStudentById(-1), null);
    assert.strictEqual(myClass.getStudentById(10), null);
    const names = ['John', 'Jane', 'Doe', 'Smith'];
    names.forEach(name => {
        const student = new Student();
        student.setName(name);
        const newStudentId = myClass.addStudent(student);
        const newStudentName = myClass.getStudentById(newStudentId).getName();
    });
    assert.strictEqual(myClass.getStudentById(0).getName(), 'John');
    assert.strictEqual(myClass.getStudentById(1).getName(), 'Jane');
    assert.strictEqual(myClass.getStudentById(2).getName(), 'Doe');
    assert.strictEqual(myClass.getStudentById(3).getName(), 'Smith');
});

test("Test Student's setName", () => {
    // TODO
    const student = new Student();
    student.setName(123);
    assert.strictEqual(student.getName(), '');
    student.setName('123');
    assert.strictEqual(student.getName(), '123');
});

test("Test Student's getName", () => {
    // TODO
    const student = new Student();
    student.setName(123);
    assert.strictEqual(student.getName(), '');
    student.setName('123');
    assert.strictEqual(student.getName(), '123');
});