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

    const index2 = myClass.addStudent("Not student type");
    assert.strictEqual(index2, -1);
});

test("Test MyClass's getStudentById", () => {

    const myClass = new MyClass();
    const student = new Student();
    myClass.addStudent(student);

    const retrievedStudent = myClass.getStudentById(0);

    assert.strictEqual(retrievedStudent, student);

    const retrievedStudent2 = myClass.getStudentById(-100);
    assert.strictEqual(retrievedStudent2, null);


});

test("Test Student's setName", () => {

    const student = new Student();
    student.setName("Charlie");
    assert.strictEqual(student.name, "Charlie");

    student.setName(123);
    assert.strictEqual(student.name, "Charlie")

});

test("Test Student's getName", () => {

    const student = new Student();
    const name = student.getName();
    assert.strictEqual(name, "");

    student.setName("David");
    const name2 = student.getName();
    assert.strictEqual(name2, "David");

});