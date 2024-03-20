"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const assert_1 = __importDefault(require("assert"));
const main_1 = require("./main");
(0, node_test_1.default)("MailSystem's write", () => {
    const mailSystem = new main_1.MailSystem();
    const name = "Squid";
    assert_1.default.strictEqual(mailSystem.write(name), `Congrats, ${name}!`);
});
(0, node_test_1.default)("MailSystem's send", (t) => {
    const mailSystem = new main_1.MailSystem();
    t.mock.method(Math, "random").mock.mockImplementationOnce(() => 0.6);
    assert_1.default.strictEqual(mailSystem.send("Squid", "Hello!"), true);
    t.mock.method(Math, "random").mock.mockImplementationOnce(() => 0.4);
    assert_1.default.strictEqual(mailSystem.send("Squid", "Hello!"), false);
});
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const writeFile = util_1.default.promisify(fs_1.default.writeFile);
(0, node_test_1.default)("Application's getNames and constructor", () => __awaiter(void 0, void 0, void 0, function* () {
    const filename = "name_list.txt";
    const fileContext = "Quan\nSquid\nZoe";
    yield writeFile(filename, fileContext, "utf8");
    const app = new main_1.Application();
    assert_1.default.deepStrictEqual(yield app.getNames(), [["Quan", "Squid", "Zoe"], []]);
}));
const people = ["Quan", "Squid", "Zoe"];
const getNamesToMock = () => __awaiter(void 0, void 0, void 0, function* () { return [people, []]; });
(0, node_test_1.default)("Application's getRandomPerson", (t) => __awaiter(void 0, void 0, void 0, function* () {
    t.mock.method(main_1.Application.prototype, "getNames").mock.mockImplementation(getNamesToMock);
    const app = new main_1.Application();
    yield app.getNames();
    assert_1.default.ok(people.includes(app.getRandomPerson()));
}));
(0, node_test_1.default)("Application's selectNextPerson", (t) => __awaiter(void 0, void 0, void 0, function* () {
    t.mock.method(main_1.Application.prototype, "getNames").mock.mockImplementation(getNamesToMock);
    const app = new main_1.Application();
    yield app.getNames();
    var calledCount = 0;
    t.mock.method(app, "getRandomPerson").mock.mockImplementation(() => {
        calledCount++;
        var accumulated = 0;
        for (var i = 1; true; i++) {
            for (var j = 1; j <= i; j++) {
                accumulated++;
                if (accumulated == calledCount)
                    return app.people[j - 1];
            }
        }
    });
    for (var i = 0; i < app.people.length; i++)
        assert_1.default.ok(app.people.includes(app.selectNextPerson()));
    assert_1.default.strictEqual(app.selectNextPerson(), null);
}));
(0, node_test_1.default)("Application's notifySelected", (t) => __awaiter(void 0, void 0, void 0, function* () {
    t.mock.method(main_1.Application.prototype, "getNames").mock.mockImplementation(getNamesToMock);
    const app = new main_1.Application();
    yield app.getNames();
    app.selected = Array.from(app.people);
    app.selected.splice(0, 1);
    const writeMock = t.mock.method(app.mailSystem, "write").mock;
    writeMock.mockImplementation((name) => `Hello ${name}!`);
    const sendMock = t.mock.method(app.mailSystem, "send").mock;
    sendMock.mockImplementation((name, context) => true);
    app.notifySelected();
    assert_1.default.strictEqual(writeMock.callCount(), app.selected.length);
    assert_1.default.strictEqual(sendMock.callCount(), app.selected.length);
}));
