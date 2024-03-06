const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

// Test MyClass's addStudent with various inputs
test("MyClass's addStudent with various inputs", async (t) => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName("Test Student");
    const index = myClass.addStudent(student);
    assert.strictEqual(index, 0, "Should return index 0 for the first student");

    const nonStudent = {}; // Not an instance of Student
    const result = myClass.addStudent(nonStudent);
    assert.strictEqual(result, -1, "Should return -1 when adding non-Student");

    // Testing with null, undefined and basic types
    assert.strictEqual(myClass.addStudent(null), -1, "Should return -1 for null");
    assert.strictEqual(myClass.addStudent(undefined), -1, "Should return -1 for undefined");
    assert.strictEqual(myClass.addStudent("string"), -1, "Should return -1 for string");
});

// Test MyClass's getStudentById with boundary values
test("MyClass's getStudentById with boundary values", async (t) => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName("Boundary Test Student");
    const index = myClass.addStudent(student);

    const outOfBoundIndex = myClass.getStudentById(myClass.students.length);
    assert.strictEqual(outOfBoundIndex, null, "Should return null for out of bounds index");

    const negativeIndex = myClass.getStudentById(-1);
    assert.strictEqual(negativeIndex, null, "Should return null for negative index");
});

// Test Student's setName with different types of input
test("Student's setName with different types of input", async (t) => {
    const student = new Student();
    student.setName("Test Name");
    assert.strictEqual(student.getName(), "Test Name", "Should return the correct name after setting it");

    student.setName(123); // Attempt to set name with non-string
    assert.strictEqual(student.getName(), "Test Name", "Name should remain unchanged when setting with non-string");

    student.setName(""); // Setting name to an empty string
    assert.strictEqual(student.getName(), "", "Name should be empty when set to an empty string");

    student.setName(" "); // Setting name to a space
    assert.strictEqual(student.getName(), " ", "Name should be a space when set to a space");
});

// Test Student's getName without setting name
test("Student's getName without setting name", async (t) => {
    const student = new Student();
    assert.strictEqual(student.getName(), '', "Should return an empty string if name has not been set");
});
