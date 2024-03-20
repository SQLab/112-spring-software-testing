const {describe, it} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// TODO: write your tests here

describe("Test Calculator's exp", () => {

    it("error case",()=>{
    const cal=new Calculator();
    const testcases=[{input:Infinity,output:{name:'Error',message:'unsupported operand type'}},{input:1000000,output:{name:'Error',message:'overflow'}}];
    for(const ts of testcases)
    {
    	assert.throws(()=>{cal.exp(ts.input);},ts.output);
    }

    });

    it("normal case",()=>{
    const cal=new Calculator();
    const testcases=[{input:0,output:1},{input:1,output:Math.exp(1)},{input:2,output:Math.exp(2)}];
    for(const ts of testcases)
    {
    	assert.strictEqual(cal.exp(ts.input),ts.output);
    }

    });

});


describe("Test Calculator's log", () => {

    it("error case",()=>{
    const cal=new Calculator();
    const testcases=[{input:Infinity,output:{name:'Error',message:'unsupported operand type'}},{input:0,output:{name:'Error',message:'math domain error (1)'}},{input:-1,output:{name:'Error',message:'math domain error (2)'}}];
    for(const ts of testcases)
    {
    	assert.throws(()=>{cal.log(ts.input);},ts.output);
    }

    });

    it("normal case",()=>{
    const cal=new Calculator();
    const testcases=[{input:1,output:0},{input:10,output:Math.log(10)},{input:100,output:Math.log(100)}];
    for(const ts of testcases)
    {
    	assert.strictEqual(cal.log(ts.input),ts.output);
    }

    });






});