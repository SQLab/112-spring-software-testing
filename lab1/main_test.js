const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    // TODO
    const myClass = new MyClass();
    //check fail case
    assert.strictEqual(myClass.addStudent({}), -1);
    //check success case
    assert.strictEqual(myClass.addStudent(new Student), 0);

});

test("Test MyClass's getStudentById", () => {
    // TODO
    const myClass = new MyClass();
    const names = ['John', 'Jane', 'Doe', 'Smith'];
    names.forEach(name => {
        const student = new Student();
        student.setName(name);
        const newStudentId = myClass.addStudent(student);
        const newStudentName = myClass.getStudentById(newStudentId).getName();
        console.log('[+] Added student with id: %d, name: %s', newStudentId, newStudentName);
    });
    assert.strictEqual(myClass.getStudentById())
    throw new Error("Test not implemented");
});

test("Test Student's setName", () => {
    // TODO
    throw new Error("Test not implemented");
});

test("Test Student's getName", () => {
    // TODO
    throw new Error("Test not implemented");
});