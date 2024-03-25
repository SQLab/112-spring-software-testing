const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    // TODO
    myClass = new MyClass();
    student = new Student();
    nonStudent = new Object();

    assert.strictEqual(myClass.addStudent(student), 0);
    assert.strictEqual(myClass.addStudent(nonStudent), -1);
    assert.strictEqual(myClass.addStudent(student), 1);
    assert.strictEqual(myClass.addStudent(nonStudent), -1);
    
    // throw new Error("Test not implemented");
});

test("Test MyClass's getStudentById", () => {
    // TODO
    myClass = new MyClass();

    student1 = new Student();
    myClass.addStudent(student1);

    student2 = new Student();
    myClass.addStudent(student2);

    student3 = new Student();
    myClass.addStudent(student3);

    assert.strictEqual(myClass.getStudentById(0), student1);
    assert.strictEqual(myClass.getStudentById(3), null);
    assert.strictEqual(myClass.getStudentById(2), student3);
    assert.strictEqual(myClass.getStudentById(1), student2);
    assert.strictEqual(myClass.getStudentById(-1), null);

    // throw new Error("Test not implemented");
});

test("Test Student's setName", () => {
    // TODO
    student1 = new Student();
    assert.strictEqual(student1.name, undefined);
    student1.setName(123);
    assert.strictEqual(student1.name, undefined);
    student1.setName(1.345);
    assert.strictEqual(student1.name, undefined);
    student1.setName('John');
    assert.strictEqual(student1.name, 'John');
    student1.setName(123);
    assert.strictEqual(student1.name, 'John');
    student1.setName(1.345);
    assert.strictEqual(student1.name, 'John');

    // throw new Error("Test not implemented");
});

test("Test Student's getName", () => {
    // TODO

    student1 = new Student();
    assert.strictEqual(student1.getName(), '');
    student1.setName(123);
    assert.strictEqual(student1.getName(), '');
    student1.setName(1.345);
    assert.strictEqual(student1.getName(), '');
    student1.setName('John');
    assert.strictEqual(student1.getName(), 'John');
    student1.setName(123);
    assert.strictEqual(student1.getName(), 'John');
    student1.setName(1.345);
    assert.strictEqual(student1.getName(), 'John');

    // throw new Error("Test not implemented");
});