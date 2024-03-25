const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

const cs = new MyClass();
const john = new Student();
john.setName("John");
var id;

test("Test MyClass's addStudent", () => {
    assert(cs.addStudent("John") == -1, "Test not implemented");
    assert(cs.addStudent(john) != -1, "Test not implemented");
});

test("Test MyClass's getStudentById", () => {
    id = cs.addStudent(john);
    assert(cs.getStudentById(-1) == null, "Test not implemented");
    assert(cs.getStudentById(id+1) == null, "Test not implemented");
    assert(cs.getStudentById(id) == john, "Test not implemented");
});

const st = new Student();
const st2 = new Student();

test("Test Student's setName", () => {
    st.setName(123);
    st2.setName("John");
});

test("Test Student's getName", () => {
    assert(st.getName() == '', "Test not implemented");
    assert(st2.getName() == 'John', "Test not implemented"); 
});