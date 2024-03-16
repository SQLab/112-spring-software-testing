const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

const myClass = new MyClass();
const names = ['John', 'Jane', 'Doe', 'Smith'];
const testnames = ['John']

test("Test MyClass's addStudent", () => {

    class TestClass {
        constructor() {
            this.students = [];
        }
    }
    const name = 'Timmy';
    const student = new Student();
    student.setName(name);

    assert.strictEqual(myClass.addStudent(student), 0);
    assert.strictEqual(myClass.addStudent(new Student()), 1);
    assert.strictEqual(myClass.addStudent('student'), -1);
    assert.strictEqual(myClass.addStudent(new TestClass()), -1);
});

test("Test MyClass's getStudentById", () => {
    
    const student1 = new Student();
    const student2 = new Student();
    student1.setName('Asuna');
    const newStudentId1 = myClass.addStudent(student1);
    student2.setName('Kirito');
    const newStudentId2 = myClass.addStudent(student2);

    assert.strictEqual(myClass.getStudentById(newStudentId1), student1);
    assert.strictEqual(myClass.getStudentById(newStudentId2), student2);
    assert.strictEqual(myClass.getStudentById(-1), null);
    assert.strictEqual(myClass.getStudentById(4), null);
});

test("Test Student's setName", () => {
    
    const student = new Student();

    assert.strictEqual(student.setName('PainPeko'), undefined);
    assert.strictEqual(student.setName(''), undefined);
    assert.strictEqual(student.setName(1), undefined);
});

test("Test Student's getName", () => {

    const student = new Student();
    assert.strictEqual(student.getName(), '');
    student.setName(1);
    assert.strictEqual(student.getName(), '');
    student.setName('BauBau');
    assert.strictEqual(student.getName(), 'BauBau');
    student.setName(1);
    assert.strictEqual(student.getName(), 'BauBau');
});

/*
    try invalid datatype input for function getSudentById()
*/

/*
    function calls are accumulated among the test suites
    that is, the data structure is shared among the test suites
*/