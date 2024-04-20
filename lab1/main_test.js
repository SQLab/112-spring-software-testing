const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    // TODO
    // throw new Error("Test not implemented");

    const myclass =  new MyClass();
    // input not a student instance, expect -1
    assert.strictEqual( -1 , myclass.addStudent());

    assert.strictEqual( 0 , myclass.addStudent(new Student()));
    assert.strictEqual( 1 , myclass.addStudent(new Student()));


});

test("Test MyClass's getStudentById", () => {
    // TODO
    // throw new Error("Test not implemented");
    const myclass =  new MyClass();
    const student0 = new Student();
    const student1 = new Student();
    
    student0.setName('Stu0');
    student1.setName('Stu1');

    myclass.addStudent(student0);
    myclass.addStudent(student1);

    assert.strictEqual( 'Stu0' , myclass.getStudentById(0).getName());
    assert.strictEqual( 'Stu1' , myclass.getStudentById(1).getName());

    assert.strictEqual( null , myclass.getStudentById(20));
});

test("Test Student's setName", () => {
    // TODO
    // throw new Error("Test not implemented");
    const student = new Student();
    // inoput a number => not string => undefined
    student.setName(312550000);
    assert.strictEqual( undefined , student.name );
    // input a string => set name
    student.setName('312550000');
    assert.strictEqual( '312550000' , student.name );


});

test("Test Student's getName", () => {
    // TODO
    // throw new Error("Test not implemented");
    const student = new Student();

    // inoput a number => not string => undefined
    student.setName(312550000);
    assert.strictEqual( '' , student.getName() );

    // input a string => set name
    student.setName('312550000');
    assert.strictEqual( '312550000' , student.getName() );

});