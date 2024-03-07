const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');
const app = new Application();

test('selected should be empty', () => {
    app.getNames();
    assert(app.selected == [], "Test not implemented");
});

test('should return a random person from the list', () => {
    const randomPerson = app.getRandomPerson();

    assert.include(app.people, randomPerson);
});

test('should select the next person and add to the selected list', () => {
    const app = new Application();
    const selectedPerson = app.selectNextPerson();

    assert.include(app.selected, selectedPerson);
});

test('should return null when all people are selected', () => {
    const app = new Application();

    // Select all people
    app.people.forEach(() => app.selectNextPerson());

    const selectedPerson = app.selectNextPerson();

    assert.isNull(selectedPerson);
});
