const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    const cls = new MyClass();
    assert.strictEqual(-1, cls.addStudent(123));
    assert.strictEqual(0, cls.addStudent(new Student()))
    assert.strictEqual(1, cls.addStudent(new Student()))
});

test("Test MyClass's getStudentById", () => {
    const cls = new MyClass();
    const stu0 = new Student();
    stu0.setName('stu0');
    const stu1 = new Student();
    stu1.setName('stu1');
    cls.addStudent(stu0);
    cls.addStudent(stu1);

    assert.strictEqual('stu0', cls.getStudentById(0).getName());
    assert.strictEqual('stu1', cls.getStudentById(1).getName());
    assert.strictEqual(null, cls.getStudentById(123));
});

test("Test Student's setName", () => {
    const stu = new Student();
    assert.strictEqual(undefined, stu.name);
    stu.setName(123);
    assert.strictEqual(undefined, stu.name);
    stu.setName('stu0');
    assert.strictEqual('stu0', stu.name);
});

test("Test Student's getName", () => {
    const stu = new Student();
    assert.strictEqual('', stu.getName());
    stu.name = 'stu0';
    assert.strictEqual('stu0', stu.getName());
});