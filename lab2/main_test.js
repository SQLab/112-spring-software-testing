const { describe, it, mock, beforeEach, afterEach } = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary

describe("test mail system", ()=>{
    it("Test MailSystem.write", () => {
        const mailSystem = new MailSystem();
        const input = ['john', "小明", ""];
        const expectedOutput = [
            "Congrats, john!",
            "Congrats, 小明!",
            "Congrats, !"
        ]
        input.forEach((input, index)=>{
            assert.equal(mailSystem.write(input), expectedOutput[index]);
        })
    })
    
    it("Test MailSystem.send", (context) => {
        const mailSystem = new MailSystem();
        const randomValues = [0.3, 1, 0.489215, 0.48, 0, -3, 50];
        randomValues.forEach((val)=>{
            context.mock.method(Math, 'random', () => val);
            assert.equal(mailSystem.send("test", "test"), val>0.5);
            assert.equal(Math.random.mock.calls.length, 1)
        })

    })
})

const util = require('util')
describe("test Application system", ()=>{
    const mockData = "john\nAlbert\n黃曉明\n\n321\na;dklfj \nKim, Jong-Chi";
    const mockPeople = [123, 456]
    const mockSelected = [789, 101112]
    const mockMailSystem = {
        write(name){return "mock mail system write result"},
        send(name, context){return "mock mail system send result"}
    }
    beforeEach(()=>{
        mock.restoreAll();
    })
    afterEach(()=>{
        mock.restoreAll();
    })

    it("Test Application constructor", async (t) => {
        t.mock.method(Application.prototype, "getNames", async ()=>[mockPeople, mockSelected])
        const app = new Application()
        const timer = new Promise((resolve, reject)=>{setTimeout(()=>{resolve()}, 100)});
        await timer;
        assert.equal(app.people, mockPeople)
        assert.equal(app.selected, mockSelected)
    })
    
    it("Test Application.getName", async () => {
        mock.method(util, 'promisify', (fun) => 
            (fileName) =>
                new Promise((resolve, reject)=>{
                    resolve(mockData);
                })
        );
        delete require.cache[require.resolve('./main')]
        const { Application } = require('./main');
        const app = new Application();
        const res = await app.getNames();
        assert.deepEqual(res, [mockData.split('\n'), []])
    })
    
    it("Test Application.getRandomPerson", async (t) => {
        t.mock.method(Application.prototype, "getNames", async ()=>[[1, 2, 3, 4, 5], [1, 2, 3]])
        const app = new Application();
        const timer = new Promise((resolve, reject)=>{setTimeout(()=>{resolve()}, 100)});
        await timer;
        const randomVals = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
        const expectedOut = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
        randomVals.forEach((e, i)=>{
            t.mock.method(Math, 'random', () => e);
            assert.equal(app.getRandomPerson(e), expectedOut[i]);
        })
    })

    it("test Application.selectNextPerson all selected", async(t)=>{
        t.mock.method(Application.prototype, "getNames", async ()=>[[1, 2, 3], [1, 2, 3]])
        const app = new Application();
        const timer = new Promise((resolve, reject)=>{setTimeout(()=>{resolve()}, 100)});
        await timer;
        assert.equal(app.selectNextPerson(), null)
    })
    it("test Application.selectNextPerson first attempt success", async (t)=>{
        t.mock.method(Application.prototype, "getNames", async ()=>[[1, 2, 3], [2, 3]])
        t.mock.method(Application.prototype, "getRandomPerson", () => 1)
        const app = new Application();
        const timer = new Promise((resolve, reject)=>{setTimeout(()=>{resolve()}, 100)});
        await timer;
        console.log(app.getRandomPerson())
        assert.equal(app.selectNextPerson(), 1)
    })
    it("test Application.selectNextPerson third attempt success", async (t)=>{
        let counter = 3;
        t.mock.method(Application.prototype, "getNames", async ()=>[[1, 2, 3], [2, 3]]);
        t.mock.method(Application.prototype, "getRandomPerson", () => counter--);
        const app = new Application();
        const timer = new Promise((resolve, reject)=>{setTimeout(()=>{resolve()}, 100)});
        await timer;
        assert.equal(app.selectNextPerson(), 1)
        assert.equal(app.getRandomPerson.mock.calls.length, 3)
    })
    
    it("test Application.notifySelected", async (t)=>{
        t.mock.method(Application.prototype, "getNames", async ()=>[[1, 2, 3], [2, 3]]);
        t.mock.method(Application.prototype, "getRandomPerson", () => counter--);
        const app = new Application();
        app.mailSystem = mockMailSystem;
        t.mock.method(mockMailSystem, "send")
        t.mock.method(mockMailSystem, "write")
        const timer = new Promise((resolve, reject)=>{setTimeout(()=>{resolve()}, 100)});
        await timer;
        app.notifySelected();
        assert.equal(mockMailSystem.send.mock.calls.length, 2)
        assert.equal(mockMailSystem.write.mock.calls.length, 2)
    })
})