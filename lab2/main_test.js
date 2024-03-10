const test = require('node:test');
const assert = require('assert');

// https://gist.github.com/sscovil/6502c72de3e24232f66b5bf86de04680
/**
 * Utility that waits for @predicate function to return truthy, testing at @interval until @timeout is reached.
 *
 * Example: await until(() => spy.called);
 *
 * @param {Function} predicate
 * @param {Number} interval
 * @param {Number} timeout
 *
 * @return {Promise}
 */
async function until(predicate, interval = 500, timeout = 30 * 1000) {
    const start = Date.now();

    let done = false;

    do {
        if (predicate()) {
            done = true;
        } else if (Date.now() > (start + timeout)) {
            throw new Error(`Timed out waiting for predicate to return true after ${timeout}ms.`);
        }

        await new Promise((resolve) => setTimeout(resolve, interval));
    } while (done !== true);
}

function mockFs(t) {
    const fs = require('fs')
    let mockName = ''
    // HACK: make it usable for util.promisify
    t.mock.method(fs, 'readFile', (_0, _1, cb) => {
        cb(undefined, mockName);
    });

    return (name) => { mockName = name };
}

test('until', async t => {
    let ok = false;
    setTimeout(() => ok = true, 666);

    assert.rejects(until(() => ok, 5, 20), { name: 'Error' })
});

test('Application', async t => {
    const setMockName = mockFs(t);
    const { Application } = require('./main');

    await t.test('parse names', async () => {
        const app = new Application();
        setMockName('name0\nname1');

        const [people, selected] = await app.getNames();
        assert.deepStrictEqual(['name0', 'name1'], people)
        assert.deepStrictEqual([], selected)
    });

    await t.test('parse names with cr / space', async () => {
        const app = new Application();
        setMockName('name0\r\nname 1');

        const [people, selected] = await app.getNames();
        assert.deepStrictEqual(['name0\r', 'name 1'], people)
        assert.deepStrictEqual([], selected)
    });

    await t.test('selected person should populated in `selected` array', async () => {
        setMockName(['name0', 'name1', 'name2'].join('\n'));
        const app = new Application();
        let nextPersonIndex = 0;
        t.mock.method(app, 'getRandomPerson', function () {
            return this.people[nextPersonIndex];
        });
        await until(() => app.people.length != 0, 100, 1000);

        assert.strictEqual('name0', app.selectNextPerson());
        nextPersonIndex++;
        assert.strictEqual('name1', app.selectNextPerson());
        nextPersonIndex++;
        assert.strictEqual('name2', app.selectNextPerson());

        assert.strictEqual(null, app.selectNextPerson());
        assert.deepStrictEqual(['name0', 'name1', 'name2'], app.selected);
    });

    await t.test('selectNextPerson will dedup', async () => {
        const people = ['name0', 'name1', 'name2'];
        setMockName(people.join('\n'));
        const app = new Application();
        let nextPersonIndex = 0;
        t.mock.method(app, 'getRandomPerson', function () {
            const ret = this.people[nextPersonIndex];
            nextPersonIndex = (nextPersonIndex + 1) % people.length;
            return ret;
        });
        await until(() => app.people.length != 0, 100, 1000);

        assert.strictEqual('name0', app.selectNextPerson());
        nextPersonIndex = 0;
        assert.strictEqual('name1', app.selectNextPerson());
    });

    await t.test('notifySelected', async () => {
        setMockName(['name0', 'name1', 'name2'].join('\n'));
        let randomResult = 0;
        t.mock.method(Math, 'random', () => randomResult);
        const app = new Application();

        await until(() => app.people.length != 0, 100, 1000);

        app.selectNextPerson();
        app.notifySelected();

        randomResult = 1;
        app.notifySelected();
    });
});
