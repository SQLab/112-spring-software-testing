const {describe, it} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

it('happy test exp',(t)=>{
	const testcase=[
	{param:0, expected:1},
	{param:1, expected:2.718281828459045},
	{param:-1, expected:0.36787944117144233}
	];
	const calculator = new Calculator();
	for (const tc of testcase){
		assert.strictEqual(calculator.exp(tc.param),tc.expected);
	}
});

it('error exp',(t)=>{
	const testcase=[
	{param:'abc', expected:'unsupported operand type'},
	{param:999999999999, expected:'overflow'}
	];
	const calculator = new Calculator();
	for (const tc of testcase){
		assert.throws(()=>{
			calculator.exp(tc.param);
		},{message:tc.expected});
	}
});

it('happy test log',(t)=>{
	const testcase=[
	{param:1, expected:0},
	{param:2.718281828459045, expected:1},
	{param:0.36787944117144233, expected:-1}
	];
	const calculator = new Calculator();
	for (const tc of testcase){
		assert.strictEqual(calculator.log(tc.param),tc.expected);
	}
});

it('error log',(t)=>{
	const testcase=[
	{param:'abc', expected:'unsupported operand type'},
	{param:0, expected:'math domain error (1)'},
	{param:-1, expected:'math domain error (2)'}
	];
	const calculator = new Calculator();
	for (const tc of testcase){
		assert.throws(()=>{
			calculator.log(tc.param);
		},{message:tc.expected});
	}
});
