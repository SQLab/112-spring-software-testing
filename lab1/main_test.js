const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

// const myClass = new MyClass();
// const names = ['John', 'Jane', 'Doe', 'Smith'];
// names.forEach(name => {
//     const student = new Student();
//     student.setName(name);
//     const newStudentId = myClass.addStudent(student);
//     const newStudentName = myClass.getStudentById(newStudentId).getName();
//     console.log('[+] Added student with id: %d, name: %s', newStudentId, newStudentName);
// });

test("Test MyClass's addStudent", () => {
    const myClass = new MyClass();
    const names = ['John', 'Jane', 'Doe', 'Smith'];
    for (let i = 0; i < names.length; i++) {
        const student = new Student();
        const validStudentId = myClass.addStudent(student);
        assert.strictEqual(validStudentId, i);
    }

    const invalidStudentId = myClass.addStudent({});
    assert.strictEqual(invalidStudentId, -1);
});

test("Test MyClass's getStudentById", () => {
    const myClass = new MyClass();
    const names = ['John', 'Jane', 'Doe', 'Smith'];
    names.forEach(name => {
        const student = new Student();
        student.setName(name);
        const newStudentId = myClass.addStudent(student);
        const newStudentName = myClass.getStudentById(newStudentId).getName();
        assert.strictEqual(newStudentName, name);
    });

    const nonExistingStudent = myClass.getStudentById(4);
    assert.strictEqual(nonExistingStudent, null);

    const nonExistingStudent_2 = myClass.getStudentById(-1);
    assert.strictEqual(nonExistingStudent_2, null);
});

test("Test Student's setName", () => {
    const student = new Student();

    student.setName('John');
    assert.strictEqual(student.getName(), 'John');

    student.setName(123);
    assert.strictEqual(student.getName(), 'John');
});

test("Test Student's getName", () => {
    const student = new Student();

    assert.strictEqual(student.getName(), '');

    student.setName('John');
    assert.strictEqual(student.getName(), 'John');
});