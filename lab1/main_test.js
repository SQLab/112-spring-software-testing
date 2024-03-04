const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    const myClass = new MyClass();
    assert.strictEqual(myClass.addStudent(new Student()), 0);
    assert.strictEqual(myClass.addStudent(''), -1);
});

test("Test MyClass's getStudentById", () => {
    const myClass = new MyClass();
    const names = ['John', 'Jane', 'Doe', 'Smith'];
    names.forEach(name => {
        const student = new Student();
        student.setName(name);
        myClass.addStudent(student);
    });

    assert.strictEqual(myClass.getStudentById(1).getName(), 'Jane');
    assert.strictEqual(myClass.getStudentById(-1), null);
    assert.strictEqual(myClass.getStudentById(4), null);
});

test("Test Student's setName", () => {
    const student1 = new Student();
    student1.setName('John');
    assert.strictEqual(student1.name, 'John');

    const student2 = new Student();
    student2.setName(123);
    assert.strictEqual(student2.name, undefined);
});

test("Test Student's getName", () => {
    const student1 = new Student();
    student1.setName('John');
    assert.strictEqual(student1.getName(), 'John');

    const student2 = new Student();
    assert.strictEqual(student2.getName(), '');
});
