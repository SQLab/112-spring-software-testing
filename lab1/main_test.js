const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
  const myClass = new MyClass();
  //create 2 students John & Jane
  const student1 = new Student();
  student1.setName('John');
  const id1 = myClass.addStudent(student1);
  assert.strictEqual(id1, 0);

  const student2 = new Student();
  student2.setName('Jane');
  const id2 = myClass.addStudent(student2);
  assert.strictEqual(id2, 1);
    
  //新增一個TESTING student
  const invalidStudent = 'TESTING';
  const invalidId = myClass.addStudent(invalidStudent);
  assert.strictEqual(invalidId, -1);
  
});

test("Test MyClass's getStudentById", () => {
  const myClass = new MyClass();
  const student1 = new Student();
  student1.setName('John');
  myClass.addStudent(student1);
  
  const retrievedStudent = myClass.getStudentById(0);
  assert.strictEqual(retrievedStudent.getName(), 'John');
  
  const invalidStudent = myClass.getStudentById(-1);
  assert.strictEqual(invalidStudent, null);
  
  const outOfBoundsStudent = myClass.getStudentById(1);
  assert.strictEqual(outOfBoundsStudent, null);
  
});

test("Test Student's setName", () => {
  const student = new Student();
  //測試變數是否有效
  student.setName('Alice');
  assert.strictEqual(student.getName(), 'Alice');
  
  student.setName(123); 
  assert.strictEqual(student.getName(), 'Alice');

});

test("Test Student's getName", () => {
  const student = new Student();
  // 初始化未設置
  assert.strictEqual(student.getName(), '');
  
  // 設置變數後返回
  student.setName('Bob');
  assert.strictEqual(student.getName(), 'Bob');
  
});
