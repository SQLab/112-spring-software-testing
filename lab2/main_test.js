const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');
const fs = require('fs');


test("Test MailSystem's write", () => {
    
    const mail=new MailSystem();
    assert.strictEqual(mail.write("Daniel"),'Congrats, Daniel!');
    
});

test("Test MailSystem's send", () => {
    
    const mail=new MailSystem();
    const name="Daniel";
    const context="";
    assert.strictEqual(typeof(mail.send(name,context)), "boolean" );
    assert.strictEqual(typeof(mail.send(name,context)), "boolean" );
    assert.strictEqual(typeof(mail.send(name,context)), "boolean" );
    assert.strictEqual(typeof(mail.send(name,context)), "boolean" );
    assert.strictEqual(typeof(mail.send(name,context)), "boolean" );
    assert.strictEqual(typeof(mail.send(name,context)), "boolean" );
    assert.strictEqual(typeof(mail.send(name,context)), "boolean" );
});

class FakeMailSystem  {
    constructor() {
        this.sended = [];
    }
   
    write(name) {
        const context = 'haha,' + name;
        console.log("sending");
        return context;
    }

    send(name, context) {
        this.sended.push(context);
    }
}

test("Test Application's getNames",async () => {
  fs.writeFileSync('name_list.txt', 'Daniel\nAndy');
  const app = new Application();
  const result=await app.getNames(); // wait for reading file
  
  assert.strictEqual(result[0][0],"Daniel");  
  assert.strictEqual(result[0][1],"Andy");
    
});

test("Test Application's getRandomPerson", async () => {
    fs.writeFileSync('name_list.txt', 'Daniel\nAndy');
    const app = new Application();
    const result=await app.getNames(); // wait for reading file
    assert.match(app.getRandomPerson(),new RegExp("Daniel|Andy"));
    assert.match(app.getRandomPerson(),new RegExp("Daniel|Andy"));
    assert.match(app.getRandomPerson(),new RegExp("Daniel|Andy"));
});

test("Test Application's selectNextPerson", async () => {
    fs.writeFileSync('name_list.txt', 'Daniel\nAndy');
    const app = new Application();
    const result=await app.getNames(); // wait for reading file
    assert.match(app.selectNextPerson(),new RegExp("Daniel|Andy"));
    assert.notEqual(app.selected,null);
    assert.match(app.selectNextPerson(),new RegExp("Daniel|Andy"));
    assert.strictEqual(app.selectNextPerson(),null);
    
});

test("Test Application's notifySelected",async () => {
    fs.writeFileSync('name_list.txt', 'Daniel');
    const app = new Application();
    const result=await app.getNames(); // wait for reading file
    app.selectNextPerson();
    app.selectNextPerson();
    const faking=new FakeMailSystem();
    app.mailSystem=faking;
    app.notifySelected();
    assert.strictEqual(faking.sended[0],"haha,Daniel");
    
    
});



