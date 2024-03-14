class Calculator {
    exp(x) {
        if (!Number.isFinite(x)) {
            throw Error('unsupported operand type');
        }
        const result = Math.exp(x);
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