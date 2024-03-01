const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');


test("Test MyClass's addStudent", () => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName("Michael");
    assert.strictEqual(myClass.addStudent(student), 0);
    assert.strictEqual(myClass.addStudent("student"), -1);
    // TODO
    // throw new Error("Test not implemented");
});

test("Test MyClass's getStudentById", () => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName("Lucy");

    assert.strictEqual(myClass.addStudent(student), 0);
    assert.strictEqual(myClass.getStudentById(0), myClass.students[0]);
    assert.ifError(myClass.getStudentById(1));
    assert.ifError(myClass.getStudentById(-3));
    // TODO
    // throw new Error("Test not implemented");
});

test("Test Student's setName", () => {
    const student = new Student();
    student.setName("Meow");
    assert.strictEqual(student.name,"Meow");
    const student1 = new Student();
    student1.setName(123456789);
    assert.strictEqual(student1.name,undefined);


    // TODO
    // throw new Error("Test not implemented");
});

test("Test Student's getName", () => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName("Lucy");
    myClass.addStudent(student);
    assert.strictEqual(myClass.getStudentById(0).getName(),"Lucy");
    const student1 = new Student();
    student1.setName(123456789);
    myClass.addStudent(student1);
    assert.strictEqual(myClass.getStudentById(1).getName(),"");

    // TODO
    // throw new Error("Test not implemented");
});