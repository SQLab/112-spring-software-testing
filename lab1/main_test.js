const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

const names = ['John', 'Jane', 'Doe', 'Smith'];

test("Test MyClass's addStudent", () => {
    let myClass = new MyClass();
    assert.strictEqual(myClass.students.length, 0);

    let stdid = myClass.addStudent([]);
    assert.strictEqual(stdid, -1);

    for(let i=0; i<100; i++){
        let stdid = myClass.addStudent(new Student());
        assert.strictEqual(myClass.students.length, i+1);
        assert.strictEqual(stdid, i);
    }
});

test("Test MyClass's getStudentById", () => {
    let myClass = new MyClass();
    let stdids = [];
    for(let i=0; i<names.length; i++){
        let student = new Student();
        student.setName(names[i]);
        stdids.push(myClass.addStudent(student));
    }

    for(let i=0; i<names.length; i++){
        let student = myClass.getStudentById(stdids[i]);
        assert.strictEqual(student.getName(), names[i]);
    }

    let student = myClass.getStudentById(-1);
    assert.strictEqual(student, null);
    let student2 = myClass.getStudentById(100);
    assert.strictEqual(student2, null);
});

test("Test Student's setName", () => {
    let student = new Student();

    student.setName(123);
    assert.strictEqual(student.getName(), '');

    for(let name in names){
        student.setName(name);
        assert.strictEqual(student.getName(), name);
    }
});

test("Test Student's getName", () => {
    let student = new Student();
    assert.strictEqual(student.getName(), '');

    for(let name in names){
        student.setName(name);
        assert.strictEqual(student.getName(), name);
    }
});