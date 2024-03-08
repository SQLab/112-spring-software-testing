const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    
    //case 1
    const myclass = new MyClass();
    assert.strictEqual(myclass.addStudent("for_test"), -1);

    //case 2
    const student = new Student();
    assert.strictEqual(myclass.addStudent(student), 0);

});

test("Test MyClass's getStudentById", () => {
    
    //case 1
    const myclass = new MyClass();
    assert.strictEqual(myclass.getStudentById(-1), null);

    //case 2
    assert.strictEqual(myclass.getStudentById(1),null);

    //case 3
    const student1 = new Student();
    myclass.addStudent(student1);
    assert.strictEqual(myclass.getStudentById(0),student1);

});

test("Test Student's setName", () => {

    const student = new Student();

     //case 1
    assert.strictEqual(student.setName(1), undefined);
    
     //case 2
    assert.strictEqual(student.setName('Amy'), undefined);

});

test("Test Student's getName", () => {
    
    const student = new Student();

    //case 1
    assert.strictEqual(student.getName(),'');
    
    //case 2
    student.setName('Amy');
    assert.strictEqual(student.getName(),'Amy');

});
