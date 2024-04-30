const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    const myClass = new MyClass();
    const student = new Student();
    assert.strictEqual(myClass.students.length, 0);
    const id = myClass.addStudent(student);
    assert.strictEqual(myClass.students.length, 1);
    assert.strictEqual(id, 0);
    assert.strictEqual(myClass.addStudent(new Object()), -1);
});

test("Test MyClass's getStudentById", () => {
    const myClass = new MyClass();
    assert.strictEqual(myClass.getStudentById(0), null);
    for (var id = 0; id < 10; id++) {
        const student = new Student();
        student.name = id.toString();
        myClass.addStudent(student);
    }
    for (var id = 0; id < 10; id++) {
        assert.strictEqual(myClass.getStudentById(id).name, id.toString());
    }
});

test("Test Student's setName", () => {
    const student = new Student();
    student.setName("abc");
    assert.strictEqual(student.name, "abc");
    student.setName(new Object());
    assert.strictEqual(student.name, "abc");
});

test("Test Student's getName", () => {
    const student = new Student();
    assert.strictEqual(student.getName(), "");
    student.name = "abc";
    assert.strictEqual(student.getName(), "abc");
});