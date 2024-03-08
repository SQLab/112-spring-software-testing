const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    const myClass = new MyClass();
    const names = ['John', 'Jane', 'Doe', 'Smith'];
    var ctr = 0;
    const clseeList = [];
    names.forEach(name => {
        const student = new Student();
        student.setName(name);
        const newStudentId = myClass.addStudent(student);
        assert.strictEqual(newStudentId, ctr++);
        clseeList.push(student);
    });
    assert.deepStrictEqual(myClass.students, clseeList);
    const newStudentId = myClass.addStudent('Failed');
    assert.strictEqual(newStudentId, -1);
});

test("Test MyClass's getStudentById", () => {
    const myClass = new MyClass();
    const names = ['John', 'Jane', 'Doe', 'Smith'];
    var ctr = 0;
    const clseeList = [];
    names.forEach(name => {
        const student = new Student();
        student.setName(name);
        const newStudentId = myClass.addStudent(student);
        clseeList.push(student);
    });
    for (var i = 0; i < 4; ++i) {
        assert.strictEqual(myClass.getStudentById(i), clseeList[i]);
    }
    const newStudentId = myClass.getStudentById(4);
    assert.strictEqual(newStudentId, null);
    const newStudentId2 = myClass.getStudentById(-1);
    assert.strictEqual(newStudentId2, null);
    const newStudentId3 = myClass.getStudentById("A");
    assert.strictEqual(newStudentId3, undefined);
});

test("Test Student's setName", () => {
    const student = new Student();
    assert.strictEqual(student.name, undefined);
    student.setName(123);
    assert.strictEqual(student.name, undefined);
    student.setName('Test');
    assert.strictEqual(student.name, 'Test');
});

test("Test Student's getName", () => {
    const student = new Student();
    const stduentName = student.getName();
    assert.strictEqual(stduentName, '');
    student.setName('Test');
    const stduentName2 = student.getName();
    assert.strictEqual(stduentName2, 'Test');
});