const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName("kelvin");

    let index = myClass.addStudent(student);
    assert.strictEqual(index, 0, "addStudent should return index 0 for the first student");

    const notAStudent = { name: "Not a student" };
    index = myClass.addStudent(notAStudent);
    assert.strictEqual(index, -1, "addStudent should return -1 when adding a non-Student instance");
});

test("Test MyClass's getStudentById", () => {
    const myClass = new MyClass();
    const student1 = new Student();
    student1.setName("one");
    const student2 = new Student();
    student2.setName("two");

    myClass.addStudent(student1);
    myClass.addStudent(student2);


    let foundStudent = myClass.getStudentById(0);
    assert.strictEqual(foundStudent.getName(), "one", "getStudentById should return the correct student for a valid id");
    
    foundStudent = myClass.getStudentById(-1);
    assert.strictEqual(foundStudent, null, "getStudentById should return null for an invalid id");

    foundStudent = myClass.getStudentById(10);
    assert.strictEqual(foundStudent, null, "getStudentById should return null for an out-of-range id");
});

test("Test Student's setName", () => {
    const student = new Student();
    student.setName("kelvin");

    assert.strictEqual(student.name, "kelvin", "setName should set the name property correctly");


    student.setName(123); 
    assert.strictEqual(student.name,"kelvin", "setName should not update name with non-string values");
});

test("Test Student's getName", () => {
    const student = new Student();

    assert.strictEqual(student.getName(), '', "getName should return an empty string if name is undefined");

    student.setName("kelvin");
    assert.strictEqual(student.getName(), "kelvin", "getName should return the name property value");

    
});