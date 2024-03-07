const test = require("node:test");
const assert = require("assert");
const { MyClass, Student } = require("./main");

test("Test MyClass's addStudent", () => {
  const myClass = new MyClass();
  const testResult = myClass.addStudent(123);
  assert.strictEqual(testResult, -1);
  const student = new Student();
  const studentIndex = myClass.addStudent(student);
  assert.strictEqual(studentIndex, 0);
});

test("Test MyClass's getStudentById", () => {
  const myClass = new MyClass();
  const student = new Student();
  const testResult = myClass.getStudentById(-1);
  assert.strictEqual(testResult, null);
  const studentIndex = myClass.addStudent(student);
  assert.strictEqual(studentIndex, 0);
});

test("Test Student's setName", () => {
  const student = new Student();
  const testResult = student.setName(123);
  assert.strictEqual(testResult, undefined);
  student.setName("Ann");
  assert.strictEqual(student.name, "Ann");
});

test("Test Student's getName", () => {
  const myClass = new MyClass();
  const student = new Student();
  student.setName(123);
  const newtestId = myClass.addStudent(student);
  const newtestName = myClass.getStudentById(newtestId).getName();
  assert.strictEqual(newtestName, "");
  student.setName("Ann");
  const newStudentId = myClass.addStudent(student);
  const newStudentName = myClass.getStudentById(newStudentId).getName();
  assert.strictEqual(newStudentName, "Ann");
});
