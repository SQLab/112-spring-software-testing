const {describe, it} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

describe("exp()", () => {
	it("Test function exp() for non-error-results", () => {
		const testcases = [
			{ param: [1], expected: Math.exp(1)},
			{ param: [2], expected: Math.exp(2)},
			{ param: [3], expected: Math.exp(3)},
		];
		
		const calculator = new Calculator();
		for (const tc of testcases) {
			assert.strictEqual(calculator.exp.apply(this, tc.param), tc.expected);
		}
	});
	
	it("Test function exp() for error-results", () => {
		const testcases = [
			{ param: [[]], expected: 'unsupported operand type'},
			{ param: [10000], expected: 'overflow'},
		]
		
		const calculator = new Calculator();
		for (const tc of testcases) {
			assert.throws(() => {
				calculator.exp.apply(this, tc.param)
				}, { 
					name : 'Error', 
					message: tc.expected
			});
		}
	});
});

describe("log()", () => {
	it("Test function log() for non-error-results", () => {
		const testcases = [
			{ param: [1], expected: Math.log(1)},
			{ param: [2], expected: Math.log(2)},
			{ param: [3], expected: Math.log(3)},
		]
		
		const calculator = new Calculator();
		for (const tc of testcases) {
			assert.strictEqual(calculator.log.apply(this, tc.param), tc.expected);
		}
	});
	
	it("Test function log() for error-results", () => {
		const testcases = [
			{ param: [[]], expected: 'unsupported operand type'},
			{ param: [0], expected: 'math domain error (1)'},
			{ param: [-1], expected: 'math domain error (2)'},
		]
		
		const calculator = new Calculator();
		for (const tc of testcases) {
			assert.throws(() => {
				calculator.log.apply(this, tc.param)
				}, { 
					name : 'Error', 
					message: tc.expected
			});
		}
	});
});