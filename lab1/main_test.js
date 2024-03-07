const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    // TODO
    const myClass = new MyClass();
    const student = new Student();

    student.setName("John");
    const index = myClass.addStudent(student);
    assert.strictEqual(index, 0);   //check if the student index is added to the class
    
    const notAStudent = {};
    const invalidIndex = myClass.addStudent(notAStudent);
    assert.strictEqual(invalidIndex, -1);   //check if the student's name is not a string

    //throw new Error("Test not implemented");
});

test("Test MyClass's getStudentById", () => {
    // TODO
    const myClass = new MyClass();
    const student = new Student();
    student.setName("Jane");
    const id = myClass.addStudent(student);

    const retrievedStudent = myClass.getStudentById(id);
    assert.strictEqual(retrievedStudent, student); // use the id to get the student

    const invalidStudent = myClass.getStudentById(999);
    assert.strictEqual(invalidStudent, null); // check if the id is invalid

    const invalidStudent1 = myClass.getStudentById(-1);
    assert.strictEqual(invalidStudent1, null); // check if the id is invalid

    //throw new Error("Test not implemented");
});

test("Test Student's setName", () => {
    // TODO
    const student = new Student();
    student.setName("Doe");
    assert.strictEqual(student.name, "Doe"); //check if the name is set to Doe

    student.setName(123);
    assert.strictEqual(student.name, "Doe"); //check if the name is not a string

    //throw new Error("Test not implemented");
});

test("Test Student's getName", () => {
    // TODO
    const student = new Student();
    student.setName("Smith");
    assert.strictEqual(student.getName(), "Smith"); //check if the name is Smith

    const newStudent = new Student();
    assert.strictEqual(newStudent.getName(), ''); //check if the name is empty

    //throw new Error("Test not implemented");
});