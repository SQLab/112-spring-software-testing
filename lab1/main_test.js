const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    // TODO
    const myClass = new MyClass();
    const student = new Student();
    student.setName('Alex');

    assert.strictEqual(myClass.addStudent(student), 0);
    assert.strictEqual(myClass.students.length, 1);
    assert.strictEqual(myClass.students[0], student);
    // throw new Error("Test not implemented");
});

test("Test MyClass's getStudentById", () => {
    // TODO
    const myClass = new MyClass();
    const student1 = new Student();
    student1.setName("Alex");
    const student2 = new Student();
    student2.setName("Albert");
    myClass.addStudent(student1);
    myClass.addStudent(student2);

    const retrieved_student1 = myClass.getStudentById(0);
    const retrieved_student2 = myClass.getStudentById(1);
    assert.strictEqual(retrieved_student1.getName(), "Alex");
    assert.strictEqual(retrieved_student2.getName(), "Albert");
    // throw new Error("Test not implemented");
});

test("Test Student's setName", () => {
    // TODO
    const student = new Student();

    student.setName("Alex");

    assert.strictEqual(student.getName(), "Alex");
    // throw new Error("Test not implemented");
});

test("Test Student's getName", () => {
    // TODO
    const student = new Student();

    student.setName("Alex");

    const name = student.getName();

    assert.strictEqual(name, "Alex");
    // throw new Error("Test not implemented");
});