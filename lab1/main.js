// NOTICE: DO NOT MODIFY THE CODE IN THIS FILE
// But you can uncomment code below and run this file to understand how to use the classes

class MyClass {
    constructor() {
        this.students = [];
    }

    addStudent(student) {
        if (!(student instanceof Student)) {
            return -1;
        }
        this.students.push(student);
        return this.students.length - 1;
    }

    getStudentById(id) {
        if (id < 0 || id >= this.students.length) {
            return null;
        }
        return this.students[id];
    }
}

class Student {
    constructor() {
        this.name = undefined;
    }

    setName(userName) {
        if (typeof userName !== 'string') {
            return;
        }
        this.name = userName;
    }

    getName() {
        if (this.name === undefined) {
            return '';
        }
        return this.name;
    }
}

// const myClass = new MyClass();
// const names = ['John', 'Jane', 'Doe', 'Smith'];
// names.forEach(name => {
//     const student = new Student();
//     student.setName(name);
//     const newStudentId = myClass.addStudent(student);
//     const newStudentName = myClass.getStudentById(newStudentId).getName();
//     console.log('[+] Added student with id: %d, name: %s', newStudentId, newStudentName);
// });

module.exports = { MyClass, Student };