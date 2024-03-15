const test = require("node:test");
const assert = require("assert");
const { MyClass, Student } = require("./main");

test("Test MyClass's addStudent", () => {
    const myClass = new MyClass();
    const student = new Student();

    assert.strictEqual(myClass.addStudent(""), -1);
    assert.strictEqual(myClass.addStudent(student), 0);
});

test("Test MyClass's getStudentById", () => {
    const myClass = new MyClass();
    const student = new Student();
    myClass.addStudent(student);

    assert.strictEqual(myClass.getStudentById(-1), null);
    assert.strictEqual(myClass.getStudentById(100), null);
    assert.strictEqual(myClass.getStudentById(0), student);
});

test("Test Student's setName", () => {
    const name = "Rex";
    const student = new Student();

    student.setName(100);
    assert.strictEqual(student.name, undefined);

    student.setName(name);
    assert.strictEqual(student.name, name);
});

test("Test Student's getName", () => {
    const name = "Rex";
    const student = new Student();

    student.setName(100);
    assert.strictEqual(student.getName(), "");

    student.setName(name);
    assert.strictEqual(student.getName(), name);
});
