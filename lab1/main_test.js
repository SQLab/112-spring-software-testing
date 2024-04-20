const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    // TODO
    const myClass = new MyClass();
    const bob = new Student();
    bob.setName("Bob");

    const alice = new Student();
    alice.setName("Alice");

    const notStudentId = myClass.addStudent(0);
    assert.strictEqual(notStudentId, -1);

    
    const bobStudentId = myClass.addStudent(bob);
    assert.strictEqual(bobStudentId, 0);
    assert.strictEqual(myClass.students.length, 1);


    const aliceStudentId = myClass.addStudent(bob);
    assert.strictEqual(aliceStudentId, 1);
    assert.strictEqual(myClass.students.length, 2);

});

test("Test MyClass's getStudentById", () => {
    // TODO
    const myClass = new MyClass();
    const bob = new Student();
    bob.setName("Bob");

    const alice = new Student();
    alice.setName("Alice");

    const bobStudentId = myClass.addStudent(bob);
    const aliceStudentId = myClass.addStudent(alice);

    const nonExistentStudent  = myClass.getStudentById(99);

    assert.strictEqual(myClass.getStudentById(bobStudentId).getName(), "Bob");
    assert.strictEqual(myClass.getStudentById(aliceStudentId).getName(), "Alice");
    assert.strictEqual(nonExistentStudent, null);
});

test("Test Student's setName", () => {
    // TODO
    const student = new Student();

    student.setName("Bob");
    assert.strictEqual(student.getName(), "Bob");

    student.setName(0);
    assert.strictEqual(student.getName(), "Bob");

});

test("Test Student's getName", () => {
    // TODO
    const student = new Student();

    assert.strictEqual(student.getName(), "");

    student.setName("Bob");

    assert.strictEqual(student.getName(), "Bob");

});