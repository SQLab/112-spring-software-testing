const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    //TODO
    const myclass = new MyClass();
    assert.strictEqual(myclass.addStudent(), 0);
    assert.strictEqual(myclass.addStudent(), 1);
    assert.strictEqual("Return -1", -1);
    throw new Error("Test not implemented");
});

test("Test MyClass's getStudentById", () => {
    // TODO
    const myclass = new MyClass();
    assert.strictEqual(myclass.getStudentById(-1), null);
    assert.strictEqual(myclass.getStudentById(myclass.students.length), null);

    const student1 = new Student();
    student1.setName("std1");
    myclass.addStudent(student1);

    const student2 = new Student();
    student2.setName("std2");
    myclass.addStudent(student2);

    for (i = 0; i < myclass.students.length(); i++) {
        assert.strictEqual(myclass.getStudentById(i), myclass.students[i]);
    }
    
    throw new Error("Test not implemented");
});

test("Test Student's setName", () => {
    // TODO
    const student = new Student();
    assert.strictEqual(student.name("std1"), undefined);
    student.setName("std1");
    assert.strictEqual(student.name, "std1");
    throw new Error("Test not implemented");
});

test("Test Student's getName", () => {
    // TODO
    const student = new Student();
    assert.strictEqual(student.getName(), '');
    student.setName("std1");
    assert.strictEqual(student.getName(), "std1");
    throw new Error("Test not implemented");
});