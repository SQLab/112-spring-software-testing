const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    const student = new Student();
    const myClass = new MyClass();

    assert.strictEqual(myClass.addStudent(student), 0);         // first student
    assert.strictEqual(myClass.addStudent(myClass), -1);        // return  -1
});

test("Test MyClass's getStudentById", () => {
    const student = new Student();
    const myClass = new MyClass();

    const newStudentId = myClass.addStudent(student);
    assert.strictEqual(myClass.getStudentById(newStudentId), student);
    assert.strictEqual(myClass.getStudentById(100), null);                     //  over length 
});

test("Test Student's setName", () => {
    const student = new Student();

    student.setName("John");   // 使用assert.strictEqual来断言student的name属性是否被正确设置
    assert.strictEqual(student.name, "John");

    student.setName(123);      // 尝试使用非字符串值设置
    assert.strictEqual(student.name, "John");
});

test("Test Student's getName", () => {
    const student = new Student(); // undefined
    assert.strictEqual(student.getName(), '');

    student.setName("Jane");
    assert.strictEqual(student.getName(), "Jane");
});