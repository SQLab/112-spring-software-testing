const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');
const cs = new MyClass();

test("Test MyClass's addStudent", () => {
    assert(cs.addStudent("John") == -1, "Test not implemented");
});

test("Test MyClass's getStudentById", () => {
    assert(cs.getStudentById(-1) == null, "Test not implemented");
});

const st = new Student();
const st2 = new Student();
test("Test Student's setName", () => {
    assert(st.setName(123) == undefined, "Test not implemented");
});

test("Test Student's getName", () => {
    st2.setName("John")
    assert(st.getName() == '', "Test not implemented");
    assert(st2.getName() == 'John', "Test not implemented");
});