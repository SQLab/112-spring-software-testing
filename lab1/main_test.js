const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    const myClass = new MyClass();
    const jason = new Student();
    const mary = new Student();
    assert.strictEqual(0, myClass.addStudent(jason));
    assert.strictEqual(1, myClass.addStudent(mary));
    assert.strictEqual(-1, myClass.addStudent(123));
});

test("Test MyClass's getStudentById", () => {
    const myClass = new MyClass();
    const student = new Student();
    const names = ['John', 'Jane', 'Doe', 'Smith'];
    names.forEach(name => {
        const student = new Student();
        student.setName(name);
        const newStudentId = myClass.addStudent(student);
        const newStudentName = myClass.getStudentById(newStudentId).getName();
    });
    assert.strictEqual(myClass.getStudentById(-2), null);
    assert.strictEqual(myClass.getStudentById(0).getName(), 'John');
    assert.strictEqual(myClass.getStudentById(1).getName(), 'Jane');
    assert.strictEqual(myClass.getStudentById(2).getName(), 'Doe');
    assert.strictEqual(myClass.getStudentById(3).getName(), 'Smith');
    assert.strictEqual(myClass.getStudentById(4), null);
});

test("Test Student's setName", () => {
    const student1 = new Student();
    const student2 = new Student();
    student1.setName('Jason')
    assert.strictEqual(student1.name, 'Jason');
    student2.setName(234);
    assert.strictEqual(student2.name, undefined);
});

test("Test Student's getName", () => {
    const student1 = new Student();
    const student2 = new Student();
    student1.setName('Mary');
    assert.strictEqual(student1.getName(), 'Mary');
    assert.strictEqual(student2.getName(), '');
});