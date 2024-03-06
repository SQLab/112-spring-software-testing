const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {

    const myClass = new MyClass();
    const student = new Student();
    const index = myClass.addStudent(student);

    assert.strictEqual(index, 0);
    assert.strictEqual(myClass.students.length, 1);
    assert.strictEqual(myClass.getStudentById(0), student);


});

test("Test MyClass's getStudentById", () => {

    const myClass = new MyClass();
    const student = new Student();
    myClass.addStudent(student);

    const retrievedStudent = myClass.getStudentById(0);

    assert.strictEqual(retrievedStudent, student);

});

test("Test Student's setName", () => {

    const student = new Student();
    student.setName("Charlie");

    assert.strictEqual(student.name, "Charlie");

});

test("Test Student's getName", () => {

    const student = new Student();
    student.setName("David");

    const name = student.getName();

    assert.strictEqual(name, "David");

});