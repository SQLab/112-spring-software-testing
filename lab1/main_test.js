const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

const myClass = new MyClass();
const student = new Student();
test("Test MyClass's addStudent", () => {
    // TODO
    student.setName('john');
    assert(myClass.addStudent(student) === 0,'wrong id')
    assert(myClass.addStudent(myClass) === -1,'not student');
    //assert(myClass.students[0] === 'john','add successfully');
    //throw new Error("Test not implemented");
});

test("Test MyClass's getStudentById", () => {
    // TODO
    assert(myClass.getStudentById(1) === null  ,'not that much student');
    assert(myClass.getStudentById(-1) === null ,'negtive length');
    assert(myClass.getStudentById(0) === student,'get successfully');
    //throw new Error("Test not implemented");
});

test("Test Student's setName", () => {
    // TODO
    student.setName('jocelyn');
    assert(student.setName(123) === undefined,'not string');
    assert(student.name === 'jocelyn','set successfully');
    //throw new Error("Test not implemented");
});

test("Test Student's getName", () => {
    // TODO
    assert(student.getName() === 'jocelyn','get successfully');
    const newstudent = new Student();
    assert(newstudent.getName() === '','name undefined');
    //throw new Error("Test not implemented");
});