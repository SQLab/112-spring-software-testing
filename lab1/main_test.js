const test = require("node:test");
const assert = require("assert");
const { MyClass, Student } = require("./main");

test("Test MyClass's addStudent", () => {
    let myClass = new MyClass();
    // test if the type of the student is not Student
    assert.strictEqual(myClass.addStudent("not a student"), -1);

    // test if there is no student in MyClass
    assert.strictEqual(myClass.students.length, 0);

    // test if there is one student in MyClass
    let student = new Student();
    student.setName("John");
    myClass.addStudent(student);
    assert.strictEqual(myClass.students.length, 1);
});

test("Test MyClass's getStudentById", () => {
    let myClass = new MyClass();
    // test if the search id is not a number
    assert.strictEqual(myClass.getStudentById("not a number"), undefined);

    // test if student id is out of range
    assert.strictEqual(myClass.getStudentById(-1), null);
    assert.strictEqual(myClass.getStudentById(0), null);

    // test if the student is found
    let student = new Student();
    student.setName("John");
    myClass.addStudent(student);
    assert.strictEqual(myClass.getStudentById(0), student);
});

test("Test Student's setName", () => {
    let student = new Student();
    assert.strictEqual(student.setName(123), undefined);
    student.setName("John");
    assert.strictEqual(student.name, "John");
});

test("Test Student's getName", () => {
    let student = new Student();
    assert.strictEqual(student.getName(), "");
    student.setName("John");
    assert.strictEqual(student.getName(), "John");
});
