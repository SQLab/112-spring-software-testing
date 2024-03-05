const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    // TODO
    const c = new MyClass();
    const s1 = new Student();
    const s2 = new Student();
    assert.strictEqual(c.addStudent('1'), -1);
    assert.strictEqual(c.addStudent(s1),0);
    assert.strictEqual(c.addStudent(s2),1);

});

test("Test MyClass's getStudentById", () => {
    // TODO
    const c = new MyClass();
    const s1 = new Student();
    assert.strictEqual(c.getStudentById(-1), null);

    c.addStudent(s1);
    assert.strictEqual(c.getStudentById(1),null);
    assert.strictEqual(c.getStudentById(0),s1);
});

test("Test Student's setName", () => {
    // TODO
    const s1 = new Student();
    assert.strictEqual(s1.setName(1),undefined);
    assert.strictEqual(s1.setName('a'),undefined);
    
});

test("Test Student's getName", () => {
    // TODO
    const s1 = new Student();
    let n = 'Bob';
    assert.strictEqual(s1.getName(n),'');
    s1.setName('Bob');
    assert.strictEqual(s1.getName(n),'Bob');
});