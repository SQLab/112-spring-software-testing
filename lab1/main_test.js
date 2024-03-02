const test = require("node:test");
const assert = require("assert");
const { MyClass, Student } = require("./main");

test("Test MyClass's addStudent", () => {
  // TODO
  const myClass = new MyClass();
  assert.strictEqual(myClass.addStudent("Student"), -1);
  assert.strictEqual(myClass.addStudent(new Student()), 0);
  assert.strictEqual(myClass.addStudent(new Student()), 1);
  assert.strictEqual(myClass.addStudent(new Student()), 2);
});

test("Test MyClass's getStudentById", () => {
  // TODO
  const myClass = new MyClass();
  for (let i = 0; i < 10; i++) {
    myClass.addStudent(new Student());
  }

  assert.strictEqual(myClass.getStudentById(-1), null);
  assert.strictEqual(myClass.getStudentById(10), null);
  assert.strictEqual(myClass.getStudentById(4) instanceof Student, true);
});

test("Test Student's setName", () => {
  // TODO
  const student = new Student();

  assert.strictEqual(student.setName("John Cena"), undefined);
  assert.strictEqual(student.setName(123), undefined);
});

test("Test Student's getName", () => {
  // TODO
  const student = new Student();

  assert.strictEqual(student.getName(), "");
  student.setName("John Cena");
  assert.strictEqual(student.getName(), "John Cena");
});
