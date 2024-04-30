const test = require("node:test");
const assert = require("assert");
const { MyClass, Student } = require("./main");

test("Test MyClass's addStudent", () => {
    
    const testClass = new MyClass();

    // invalid student
    const inv_stu = [-1, 0, 100, "QAQ", 3.14];
    for(let i = 0; i < inv_stu.length; i++) {
        assert.strictEqual(testClass.addStudent(inv_stu[i]), -1);
    }

    // valid student
    const names = ["John", "Jane", "Doe", "Smith"];
    stuList = [];
    for(let i = 0; i < names.length; i++) {
        stuTmp = new Student();
        stuTmp.setName(names[i]);
        stuList.push(stuTmp);
    }
    for(let i = 0; i < stuList.length; i++) {
        assert.strictEqual(testClass.addStudent(stuList[i]), i);
    }

});

test("Test MyClass's getStudentById", () => {

    const testClass = new MyClass();
    const names = ["John", "Jane", "Doe", "Smith"];
    stuList = [];
    for(let i = 0; i < names.length; i++) {
        stuTmp = new Student();
        stuTmp.setName(names[i]);
        stuList.push(stuTmp);
    }
    for(let i = 0; i < stuList.length; i++) {
        testClass.addStudent(stuList[i]);
    }

    // invalid id
    const inv_id = [-1, stuList.length, stuList.length + 1];
    for(let i = 0; i < inv_id.length; i++) {
        assert.strictEqual(testClass.getStudentById(inv_id[i]), null);
    }

    // valid id
    for(let i = 0; i < stuList.length; i++) {
        console.log(testClass.getStudentById(i));
        assert.strictEqual(testClass.getStudentById(i), stuList[i]);
    }


});

test("Test Student's setName", () => {

    // invalid username
    const inv_names = [-1, 0, 100, 1234]
    for(let i = 0; i < inv_names.length; i++) {
        stuTmp = new Student();
        assert.strictEqual(stuTmp.setName(inv_names[i]), undefined);
        assert.strictEqual(stuTmp.getName(), "");
    }

    // valid username
    const v_names = ["John", "Jane", "Doe", "Smith"];
    for(let i = 0; i < v_names.length; i++) {
        stuTmp = new Student();
        assert.strictEqual(stuTmp.setName(v_names[i]), undefined);
        assert.strictEqual(stuTmp.getName(), v_names[i]);
    }

});

test("Test Student's getName", () => {

    // invalid username
    const inv_names = [-1, 0, 100, 1234]
    for(let i = 0; i < inv_names.length; i++) {
        stuTmp = new Student();
        assert.strictEqual(stuTmp.setName(inv_names[i]), undefined);
        assert.strictEqual(stuTmp.getName(), "");
    }

    // valid username
    const v_names = ["John", "Jane", "Doe", "Smith"];
    for(let i = 0; i < v_names.length; i++) {
        stuTmp = new Student();
        assert.strictEqual(stuTmp.setName(v_names[i]), undefined);
        assert.strictEqual(stuTmp.getName(), v_names[i]);
    }
    
});
