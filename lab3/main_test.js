"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const assert_1 = __importDefault(require("assert"));
const main_1 = require("./main");
(0, node_test_1.default)("Calculator's exp", () => {
    const calc = new main_1.Calculator();
    assert_1.default.throws(() => calc.exp(Number.POSITIVE_INFINITY), {
        name: "Error",
        message: "unsupported operand type",
    });
    assert_1.default.throws(() => calc.exp(Number.MAX_SAFE_INTEGER), {
        name: "Error",
        message: "overflow",
    });
    assert_1.default.strictEqual(calc.exp(5), Math.exp(5));
});
(0, node_test_1.default)("Calculator's log", () => {
    const calc = new main_1.Calculator();
    assert_1.default.throws(() => calc.log(Number.POSITIVE_INFINITY), {
        name: "Error",
        message: "unsupported operand type",
    });
    assert_1.default.throws(() => calc.log(0), {
        name: "Error",
        message: "math domain error (1)",
    });
    assert_1.default.throws(() => calc.log(-1), {
        name: "Error",
        message: "math domain error (2)",
    });
    assert_1.default.strictEqual(calc.log(5), Math.log(5));
});

