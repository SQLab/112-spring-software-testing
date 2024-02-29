const test = require("node:test");
const assert = require("assert");
const { MyClass, Student } = require("./main");

test("Test MyClass's addStudent", () => {
  let test_class = new MyClass();
  let test_student = new Student();
  assert.strictEqual(
    test_class.addStudent(test_student),
    test_class.students.length - 1
  );
  assert.strictEqual(test_class.addStudent(123), -1);
});

test("Test MyClass's getStudentById", () => {
  let test_class = new MyClass();
  assert.strictEqual(test_class.getStudentById(1), null);
  test_class.addStudent(new Student());
  assert.strictEqual(test_class.getStudentById(0), test_class.students[0]);
});

test("Test Student's setName", () => {
  let test_student = new Student();
  test_student.setName(123);
  assert.strictEqual(test_student.name, undefined);
  test_student.setName("Tony");
  assert.strictEqual(test_student.name, "Tony");
});

test("Test Student's getName", () => {
  let test_student = new Student();
  assert.strictEqual(test_student.getName(), "");
  test_student.setName("Tony");
  assert.strictEqual(test_student.getName(), "Tony");
});
