const test = require("node:test");
const assert = require("assert");
const { MyClass, Student } = require("./main");

test("Test MyClass's addStudent", () => {
    const myClass = new MyClass();
    assert.strictEqual(myClass.addStudent('Not a student'), -1);
    const student = new Student();
    for (let i = 0; i < 3; i++) {
        const student = new Student();
        assert.strictEqual(myClass.addStudent(student), i);
    }
});

test("Test MyClass's getStudentById", () => {
    const myClass = new MyClass();
    assert.strictEqual(myClass.getStudentById(-1), null);
    for (let i = 0; i < 3; i++) {
        const student = new Student();
        myClass.addStudent(student);
        assert.strictEqual(myClass.getStudentById(i), student);
    }
    assert.strictEqual(myClass.getStudentById(3), null);
});

test("Test Student's setName", () => {
    const student = new Student();
    student.setName(123);
    assert.strictEqual(student.getName(), '');
    const name = "Pudding0803";
    student.setName(name);
    assert.strictEqual(student.getName(), name);
});

test("Test Student's getName", () => {
    const student = new Student();
    assert.strictEqual(student.getName(), '');
    const name = "Pudding0803";
    student.setName(name);
    assert.strictEqual(student.getName(), name);
});
