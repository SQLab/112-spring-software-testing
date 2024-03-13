const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

class MailSystem {
    write(name) {
        console.log('--write mail for ' + name + '--');
        const context = 'Congrats, ' + name + '!';
        return context;
    }

    send(name, context) {
        console.log('--send mail to ' + name + '--');
        // Interact with mail system and send mail
        // random success or failure
        const success = Math.random() > 0.5;  //如果生成的随机数大于 0.5，则 success 被赋值为 true，否则被赋值为 false。
        if (success) {
            console.log('mail sent');
        } else {
            console.log('mail failed');
        }
        return success;
    }
}

class Application {
    constructor() {
        this.people = [];
        this.selected = [];
        this.mailSystem = new MailSystem();
        this.getNames().then(([people, selected]) => {
            this.people = people;
            this.selected = selected;
        });
    }

    async getNames() {
        const data = await readFile('name_list.txt', 'utf8');
        const people = data.split('\n');
        const selected = [];
        return [people, selected];
    }

    getRandomPerson() {
        const i = Math.floor(Math.random() * this.people.length);
        return this.people[i];
    }

    selectNextPerson() {
        console.log('--select next person--');
        if (this.people.length === this.selected.length) {
            console.log('all selected');
            return null;
        }
        let person = this.getRandomPerson();  //将调用 getRandomPerson 方法的返回值存储在名为 person 的变量中

        while (this.selected.includes(person)) {   //直到选取到一个不在 selected 数组中的人名。将选取到的人名 person 添加到 selected 数组中。
            person = this.getRandomPerson();  //通过调用 getRandomPerson() 方法重新获取一个随机选取的人名，并将其赋值给 person 变量。
        }
        this.selected.push(person);
        return person;
    }

    notifySelected() {
        console.log('--notify selected--');
        for (const x of this.selected) {
            const context = this.mailSystem.write(x);
            this.mailSystem.send(x, context);
        }
    }
}

// const app = new Application();
// app.selectNextPerson();
// app.selectNextPerson();
// app.selectNextPerson();
// app.notifySelected();

module.exports = {
    Application,
    MailSystem,
};