const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    // TODO
    const myClass = new MyClass();
    const myClass2 = new MyClass();
    const student = new Student();
    student.setName('Alex');

    assert.strictEqual(myClass.addStudent(myClass2), -1);
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
    const retrieved_student3 = myClass.getStudentById(3);
    assert.strictEqual(retrieved_student1.getName(), "Alex");
    assert.strictEqual(retrieved_student2.getName(), "Albert");
    assert.strictEqual(retrieved_student3, null);
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
    const student2 = new Student();

    student2.setName(123);
    student.setName("Alex");

    const name = student.getName();
    const name2 = student2.getName();

    assert.strictEqual(name, "Alex");
    assert.strictEqual(name2, "");
    // throw new Error("Test not implemented");
});