const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    // TODO
    var myClass = new MyClass();
    var student = new Student();

    var res = myClass.addStudent();
    assert.equal(res, -1);

    res = myClass.addStudent(student);
    assert.equal(res, 0);
    // throw new Error("Test not implemented");
});

test("Test MyClass's getStudentById", () => {
    // TODO
    var myClass = new MyClass();
    var student = new Student();

    myClass.addStudent(student);
    var res = myClass.getStudentById(0);
    assert.equal(res, student);

    res = myClass.getStudentById(-1);
    assert.equal(res, null);

    res = myClass.getStudentById(2);
    assert.equal(res, null);

});

test("Test Student's setName", () => {
    // TODO
    // throw new Error("Test not implemented");
    var student = new Student();
    student.setName("Quan");

    var res = student.name;
    assert.equal(res, "Quan");
    
    student.setName(123);
    res = student.name;
    assert.equal(res, "Quan");
});

test("Test Student's getName", () => {
    var student = new Student();

    var res = student.getName();
    assert.equal(res, "");

    student.setName("Quan");
    res = student.getName();
    assert.equal(res, "Quan");
});