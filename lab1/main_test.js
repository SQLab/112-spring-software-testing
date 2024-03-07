const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    const myClass = new MyClass();

    // Add a student
    const student = new Student();
    student.setName("OuO");
    const id = myClass.addStudent(student);
    
    // Verify that the student is added successfully
    assert.strictEqual(id, 0);
    assert.strictEqual(myClass.students.length, 1);
    assert.strictEqual(myClass.students[0], student);

    const myClass2 = new MyClass();
    const nonStudent = {};
    const id2 = myClass2.addStudent(nonStudent);
    assert.strictEqual(id2, -1);
    assert.strictEqual(myClass2.students.length, 0);

});

test("Test MyClass's getStudentById", () => {
    const myClass = new MyClass();

    // Add students
    const student1 = new Student();
    student1.setName("OuO");
    myClass.addStudent(student1);

    const student2 = new Student();
    student2.setName("owo");
    myClass.addStudent(student2);

    // Get student by ID
    const retrievedStudent = myClass.getStudentById(1);

    // Get student by invalid ID
    const failretrievedStudent1 = myClass.getStudentById(-1);
    const failretrievedStudent2 = myClass.getStudentById(3);

    // Verify that the correct student is retrieved
    assert.strictEqual(retrievedStudent, student2);
    assert.strictEqual(failretrievedStudent1, null);
    assert.strictEqual(failretrievedStudent2, null);
});

test("Test Student's setName", () => {
    const student = new Student();

    // Set name
    student.setName("OuO");

    // Verify that the name is set correctly
    assert.strictEqual(student.getName(), "OuO");

    const student2 = new Student();

    // Set name with invalid input
    student2.setName(5487);

    // Verify that the name remains unset
    assert.strictEqual(student2.getName(), "");
});

test("Test Student's getName", () => {
    const student = new Student();

    // GetName before setting name
    assert.strictEqual(student.getName(), "");

    // Set name
    student.setName("OuO");

    // Verify that the correct name is retrieved
    assert.strictEqual(student.getName(), "OuO");
});
