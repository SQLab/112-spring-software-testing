const {describe, it} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');
const test = require("node:test");

test("Test Parameterization", () => {
	const cal = new Calculator();
	
	// exp()
	const exp_testcases = [
		{param: [87], expected: 6.076030225056873e+37},
		{param: [0], expected: 1},
		{param: [-1], expected: 0.36787944117144233},
	];
	for (const tc of exp_testcases) {
		assert.strictEqual(cal.exp.apply(this, tc.param), tc.expected);
	}
	
	// log()
	const log_testcases = [
		{param: [48763], expected: 10.794727107543425},
		{param: [1], expected: 0},
		{param: [2], expected: 0.6931471805599453},
	];
	for (const tc of log_testcases) {
		assert.strictEqual(cal.log.apply(this, tc.param), tc.expected);
	}
	
});

test("Test Errors", () => {
	const cal = new Calculator();
	
	// exp()
	const exp_errorcases = [
		{param: NaN, type: 'Error', message: 'unsupported operand type'},
		{param: Infinity, type: 'Error', message: 'unsupported operand type'},
		{param: 1e3, type: 'Error', message: 'overflow'},
	];
	for (const tc of exp_errorcases) {
		assert.throws(() => cal.exp(tc.param), {
			name: tc.type,
			message: tc.message,
		});
	}
	
	// log()
	const log_errorcases = [
		{param: NaN, type: 'Error', message: 'unsupported operand type'},
		{param: Infinity, type: 'Error', message: 'unsupported operand type'},
		{param: 0, type: 'Error', message: 'math domain error (1)'},
		{param: -1, type: 'Error', message: 'math domain error (2)'},
	];
	for (const tc of log_errorcases) {
		assert.throws(() => cal.log(tc.param), {
			name: tc.type,
			message: tc.message,
		});
	}
});

