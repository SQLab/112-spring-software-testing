const test = require('node:test');  //create a JavaScript tests
const assert = require('assert');   
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {

    // vaild case
    var my_class = new MyClass();
    assert.strictEqual(my_class.addStudent(new Student()), 0);

    // invalid cass
    assert.strictEqual(my_class.addStudent(12345), -1);

});


test("Test MyClass's getStudentById", () => {

    var my_class = new MyClass();
    var student = new Student();
    student.name = "jett";
    my_class.students = [student];

    // vaild case
    assert.strictEqual(my_class.getStudentById(0), student);

    // invalid case
    assert.strictEqual(my_class.getStudentById(1), null);    // for id < this.students.length
    assert.strictEqual(my_class.getStudentById(-1), null);   // for id < 0

});

test("Test Student's setName", () => {

    var student = new Student();

    // vaild case
    student.setName("jett");
    assert.strictEqual(student.name, "jett");

    // invalid case
    var student2 = new Student();
    student2.setName(12345);
    assert.strictEqual(student2.name, undefined);

});

test("Test Student's getName", () => {

    // vaild case
    var student = new Student();
    student.name = "jett";
    assert.strictEqual(student.getName(), "jett");

    // invalid case
    var student2 = new Student();
    assert.strictEqual(student2.getName(), '');

});