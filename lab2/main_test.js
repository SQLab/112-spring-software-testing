const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');

var lastLog;
console.oldLog = console.log;
console.log = function(str){
    console.oldLog(str);
    lastLog = str;
}

test('selected should be []', () => {
    const app = new Application();
    app.getNames().then(([people, selected]) => {
        assert(app.selected.length == 0, "Test not implemented");
    });
});

test('should return a random person from the list', () => {
    const app = new Application();
    app.getNames().then(([people, selected]) => {
        assert((app.people.length == 0) ^ (app.people.indexOf(app.getRandomPerson()) != -1), "Test not implemented");
    });
});

test('should return a random person from the list', () => {
    const app = new Application();
    var rep;
    app.getNames().then(([people, selected]) => {
        for(var i=0; i<=app.people.length; i++){
            person = app.selectNextPerson();
            if(app.people.length == i)
                rep = 1;
            else
                rep = app.people.includes(person) && app.selected.includes(person);
            assert(rep, "Test not implemented");
        }
        assert(app.selectNextPerson() == null, "Test not implemented");
    });
});

test('notifySelected() should send the right number', () => {
    const app = new Application();
    const mailSystemMock = new MailSystemMock();
    app.mailSystem = mailSystemMock;
    var person = [];
    var rep;

    app.getNames().then(([people, selected]) => {
        for(var i=0; i<app.people.length; i++)
            person.push(app.selectNextPerson());
        app.notifySelected();
        for(var i=0; i<=app.people.length; i++){
            rep = mailSystemMock.writeCalls[i] == person[i];
            assert(rep, "Test not implemented");
        }
        assert.strictEqual(mailSystemMock.writeCalls.length, app.people.length);
        assert.strictEqual(mailSystemMock.sendCalls.length, app.people.length);
    });
});

test('Application.notifySelected should notify all selected people', () => {
    const app = new Application();
    const mailSystemMock = new MailSystemMock();
    app.mailSystem = mailSystemMock;
    var rep;
    var last_message = [];

    app.getNames().then(([people, selected]) => {
        for(var i=0; i<=app.people.length; i++){
            app.selectNextPerson();
            app.notifySelected();
            last_message.push(lastLog);
        }
        rep_idx = -1
        for(var i=0; i<=app.people.length; i++){
            if(i == app.people.length)
                rep = 1;
            else{
                rep = mailSystemMock.sendResults[rep_idx+i+1] ? last_message[i] == 'mail sent': last_message[i] == 'mail failed';
                rep_idx = rep_idx + i + 1;
            }
            assert(rep, "Test not implemented");
        }
        
        console.log(mailSystemMock.sendResults);
        console.log(last_message);
        //con = 'Congrats, ' + person + '\r!';
        //assert(mailSystemMock.contextCalls[0] == con, "Test not implemented");
    });
});

class MailSystemMock extends MailSystem {
    constructor() {
        super();
        this.writeCalls = [];
        this.sendCalls = [];
        this.sendResults = [];
    }

    write(name) {
        this.writeCalls.push(name);
        return super.write(name);
    }

    send(name, context) {
        this.sendCalls.push({ name, context });
        const success = super.send(name, context);
        this.sendResults.push(success);
        return success
    }
};

