const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    // TODO
    const myClassTest1 = new MyClass();
    const studentTest1 = new Student();

    // valid student
    assert.strictEqual(myClassTest1.addStudent(studentTest1), 0);

    // invalid student
    assert.strictEqual(myClassTest1.addStudent(123), -1);
});

test("Test MyClass's getStudentById", () => {
    // TODO
    const myClassTest2 = new MyClass();
    const studentTest2 = new Student();
    myClassTest2.addStudent(studentTest2);

    // valid id
    assert.strictEqual(myClassTest2.getStudentById(0), studentTest2);

    // invalid id
    assert.strictEqual(myClassTest2.getStudentById(-1), null);
    assert.strictEqual(myClassTest2.getStudentById(myClassTest2.students.length), null);
});

test("Test Student's setName", () => {
    // TODO
    const myStudentTest3 = new Student();

    //invalid name
    myStudentTest3.setName(312551074);
    assert.strictEqual(myStudentTest3.name, undefined);

    // valid name
    const nameTest3 = 'James';
    myStudentTest3.setName(nameTest3);
    assert.strictEqual(myStudentTest3.name, nameTest3);
});

test("Test Student's getName", () => {
    // TODO
    const myStudentTest4 = new Student();

    // undefined name
    assert.strictEqual(myStudentTest4.getName(), '');

    // valid name
    const nameTest4 = 'James';
    myStudentTest4.setName(nameTest4);
    assert.strictEqual(myStudentTest4.getName(), nameTest4);
});