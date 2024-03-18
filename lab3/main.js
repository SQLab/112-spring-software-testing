class Calculator {
    exp(x) {                                               
        if (!Number.isFinite(x)) {  //Number.isFinite(x) is used to determine whether the passed value x is a finite number.
            throw Error('unsupported operand type');
        }
        const result = Math.exp(x);   // Math.exp(x) is e^x where e is Euler's number (approximately 2.71828) and  x is the exponent.
        if (result === Infinity) {
            throw Error('overflow');
        }
        return result;
    }

    log(x) {
        if (!Number.isFinite(x)) {
            throw Error('unsupported operand type');
        }
        const result = Math.log(x);
        if (result === -Infinity) {
            throw Error('math domain error (1)');
        }
        if (Number.isNaN(result)) {
            throw Error('math domain error (2)');
        }
        return result;
    }
}

// const calculator = new Calculator();
// console.log(calculator.exp(87));
// console.log(calculator.log(48763));

module.exports = {
    Calculator
};
