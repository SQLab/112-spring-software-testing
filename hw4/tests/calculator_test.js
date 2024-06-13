const assert = require('assert');
const { test } = require('node:test');
const Calculator = require('../src/calculator');

function testError(param, expectedError) {
  assert.throws(() => {
    Calculator.main(...param);
  }, new Error(expectedError));
}
function testOutput(param, expectedOutput) {
	assert.strictEqual(Calculator.main(...param),expectedOutput);
}

test('invalid', (t) => {
	testError([0, 1, 1, 1, 1],"invalid month1");
	testError([13, 1, 1, 1, 1],"invalid month1");

	testError([1, 0, 1, 1, 1],"invalid day1");
	testError([1, 32, 1, 1, 1],"invalid day1");

	testError([1, 1, 0, 1, 1],"invalid month2");
	testError([1, 1, 13, 1, 1],"invalid month2");

	testError([1, 1, 1, 0, 1],"invalid day2");
	testError([1, 1, 1, 32, 1],"invalid day2");

	testError([1, 1, 1, 1, 0],"invalid year");
	testError([1, 1, 1, 1, 10001],"invalid year");

	testError([1, 2, 1, 1, 1],"day1 must be less than day2 if month1 is equal to month2");

	testError([2, 1, 1, 1, 1],"month1 must be less than month2");

	testOutput([1, 1, 1, 1, 1],0);
	testOutput([12, 1, 12, 1, 1],0);
	testOutput([1, 31, 1, 31, 1],0);
	testOutput([1, 1, 1, 1, 10000],0);
	testOutput([1, 31, 3, 31, 1],59);
	testOutput([1, 31, 3, 31, 4],60);
	testOutput([1, 31, 3, 31, 100],59);
	testOutput([1, 31, 3, 31, 400],60);
	testOutput([1, 31, 2, 1, 1],1);
	testOutput([1, 10, 2, 20, 1],41);





});