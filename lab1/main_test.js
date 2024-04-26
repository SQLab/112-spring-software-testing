const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    // TODO
    const cls = new(MyClass)
    assert.strictEqual(-1, cls.addStudent(555)) //not the type of Student instance
    assert.strictEqual(0, cls.addStudent(new Student())) //add 1 student , should return 0
    assert.strictEqual(1, cls.addStudent(new Student()))
    assert.strictEqual(2, cls.addStudent(new Student()))
});

test("Test MyClass's getStudentById", () => {
    // TODO
    const cls = new MyClass();
    const s = new Student();
    s.setName('Ian');
    cls.addStudent(s);
    cls.addStudent(new Student());

    assert.strictEqual(null, cls.getStudentById(-1) );
    assert.strictEqual(null, cls.getStudentById(3) )
    assert.strictEqual(s, cls.getStudentById(0) )
    
});

test("Test Student's setName", () => {
    // TODO
    const s = new Student()
    assert.strictEqual(undefined, s.name)

    s.setName(123456)
    assert.strictEqual(undefined, s.name)

    const str = "Ian"
    s.setName(str)
    assert.strictEqual(str, s.name)

});

test("Test Student's getName", () => {
    // TODO
    const s = new Student()
    assert.strictEqual('', s.getName())
    const str = "Ian"
    s.setName(str)
    assert.strictEqual(str, s.getName())
    
});