const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    // TODO
    class_test = new MyClass();

    // not Student instance as input
    assert.strictEqual(class_test.addStudent(1), -1);
    
    // Student instance as input
    student_test = new Student();
    assert.strictEqual(class_test.addStudent(student_test), 0);
    
    // throw new Error("Test not implemented");
});

test("Test MyClass's getStudentById", () => {
    // TODO
    class_test = new MyClass();
    student_test = new Student();
    class_test.addStudent(student_test);
    
    // <0 as input
    assert.strictEqual(class_test.getStudentById(-1), null);
    
    // >= class.students.length as input
    assert.strictEqual(class_test.getStudentById(class_test.students.length), null);
    
    // usual case
    assert.strictEqual(class_test.getStudentById(0), student_test);
    
    // throw new Error("Test not implemented");
});

test("Test Student's setName", () => {
    // TODO
    student_test = new Student();
    
    // not string as input
    student_test.setName(1);
    assert.strictEqual(student_test.name, undefined);
    
    // usual case (string as input)
    string = "John";
    student_test.setName(string);
    assert.strictEqual(student_test.name, string);
    
    // throw new Error("Test not implemented");
});

test("Test Student's getName", () => {
    // TODO
    student_test = new Student();
    
    // not string as input
    student_test.setName(1);
    assert.strictEqual(student_test.getName(), '');
    
    // usual case (string as input)
    string = "John";
    student_test.setName(string);
    assert.strictEqual(student_test.getName(), string);
    
    // throw new Error("Test not implemented");
});