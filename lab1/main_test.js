const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    const s = new Student();
    const c = new MyClass();
    assert.strictEqual(c.addStudent(s), 0);
    assert.strictEqual(c.addStudent(1), -1);
    // throw new Error("Test not implemented");
});

test("Test MyClass's getStudentById", () => {
    const s = new Student();
    const c = new MyClass();
    c.addStudent(s);
    assert.strictEqual(c.getStudentById(0), s);
    assert.strictEqual(c.getStudentById(-1), null);
    assert.strictEqual(c.getStudentById(1), null);
    // throw new Error("Test not implemented");
});

test("Test Student's setName", () => {
    const s = new Student();
    s.setName('setName');
    s.setName(1);
    assert.strictEqual(s.name, 'setName');
    // throw new Error("Test not implemented");
});

test("Test Student's getName", () => {
    const s = new Student();
    assert.strictEqual(s.getName(), '');
    s.setName('getName');
    assert.strictEqual(s.getName(), 'getName');
    // throw new Error("Test not implemented");
});
