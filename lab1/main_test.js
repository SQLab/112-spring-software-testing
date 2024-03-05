const test = require('node:test'); //從名為 'node:test' 的模組中引入某些東西，並將其指派給名為 test 的變數
const assert = require('assert');
const { MyClass, Student } = require('./main');  //從 require('./main') 返回的物件中，選擇性地取出了兩個成員，分別是 MyClass 和 Student

test("Test MyClass's addStudent", () => {   //第一個參數是測試案例的描述或名稱，第二個參數是一個回調函式，其中包含了實際的測試程式碼。() => { ... } 定義了一個不接受任何參數的匿名箭頭函式，其主體包含在花括號 {} 中。這樣的函式可以在需要函式的地方被調用或傳遞，並且它的主體程式碼會在函式被呼叫時執行。
    
    const myClass = new MyClass(); 
    const student = new Student(); 
    student.setName('Annie'); 

    const result = myClass.addStudent(student); 

    assert.strictEqual(result, 0); 
    assert.strictEqual(myClass.students.length, 1);

    const invalidstudent = {}; // 一個空物件，不是 Student 的實例
    const invalidstudentIndex = myClass.addStudent(invalidstudent);
    assert.strictEqual(invalidstudentIndex, -1);
    
    //throw new Error("Test not implemented"); //當程式碼執行到 throw 語句時，它將立即停止執行，並拋出一個錯誤
});

test("Test MyClass's getStudentById", () => {

    const myClass = new MyClass(); 
    const student = new Student(); 
    student.setName('Annie'); 
    myClass.addStudent(student); 

    const getstudent1 = myClass.getStudentById(0); 

    assert.strictEqual(getstudent1.getName(), 'Annie');

    const getstudent2 = myClass.getStudentById(-1);
    assert.strictEqual(getstudent2, null);

    //throw new Error("Test not implemented");
});

test("Test Student's setName", () => {

    const student = new Student();
    student.setName('Annie');

    assert.strictEqual(student.getName(), 'Annie'); 
    //throw new Error("Test not implemented");

    const invalidName = 123; // 數字不是有效的名字
    student.setName(invalidName);
    assert.strictEqual(student.getName(), 'Annie');
});

test("Test Student's getName", () => {

    const student = new Student(); // 創建 Student 的一個實例

    assert.strictEqual(student.getName(), ''); // 檢查未設置名字的情況下 getName 方法的行為是否正確

    //throw new Error("Test not implemented");
});
