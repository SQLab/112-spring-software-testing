const test = require('node:test');
const assert = require('assert');
const fs=require('fs');
const { Application, MailSystem } = require('./main');

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary

test('mailsystem write',(t)=>{
	const ms=new MailSystem();
	assert.strictEqual(ms.write('sam'), 'Congrats, sam!');
});
test('mailsystem send',(t)=>{
	const ms=new MailSystem();
	assert.strictEqual(typeof(ms.send('sam','mail')), 'boolean');
	assert.strictEqual(typeof(ms.send('sam','mail')), 'boolean');
	assert.strictEqual(typeof(ms.send('sam','mail')), 'boolean');
	assert.strictEqual(typeof(ms.send('sam','mail')), 'boolean');
	assert.strictEqual(typeof(ms.send('sam','mail')), 'boolean');
	assert.strictEqual(typeof(ms.send('sam','mail')), 'boolean');
	assert.strictEqual(typeof(ms.send('sam','mail')), 'boolean');
	assert.strictEqual(typeof(ms.send('sam','mail')), 'boolean');
	assert.strictEqual(typeof(ms.send('sam','mail')), 'boolean');
	assert.strictEqual(typeof(ms.send('sam','mail')), 'boolean');
});
test('mailsystem getName',async (t)=>{
	fs.writeFileSync('name_list.txt','sam\ntom\njeck','utf8');
	const app=new Application();
	const [people, selected] = await app.getNames();
	assert.strictEqual(people[0], 'sam');
	assert.strictEqual(people[1], 'tom');
	assert.strictEqual(people[2], 'jeck');
	fs.unlinkSync('name_list.txt');
});
test('mailsystem getran',async (t)=>{
	fs.writeFileSync('name_list.txt','sam\ntom\njeck','UTF-8');
	const app=new Application();
	await app.getNames();
	await app.getNames();
	await app.getNames();
	await app.getNames();
	assert.match(app.getRandomPerson(), /^(sam|tom|jeck)$/);
	fs.unlinkSync('name_list.txt');
});
test('Application selectNextPerson',async (t)=>{
	fs.writeFileSync('name_list.txt','sam\ntom\njeck','UTF-8');
	const app=new Application();
	await app.getNames();
	await app.getNames();
	await app.getNames();
	await app.getNames();
	assert.match(app.selectNextPerson(), /^(sam|tom|jeck)$/);
	assert.match(app.selectNextPerson(), /^(sam|tom|jeck)$/);
	assert.match(app.selectNextPerson(), /^(sam|tom|jeck)$/);
	assert.strictEqual(app.selectNextPerson(), null);
	fs.unlinkSync('name_list.txt');
});
test('Application notifySelected',async (t)=>{
	fs.writeFileSync('name_list.txt','sam\ntom\njeck','UTF-8');
	const app=new Application();
	await app.getNames();
	await app.getNames();
	await app.getNames();
	await app.getNames();
	app.selectNextPerson();
	assert.strictEqual(app.notifySelected(), undefined);
	assert.strictEqual(app.notifySelected(), undefined);
	assert.strictEqual(app.notifySelected(), undefined);
	assert.strictEqual(app.notifySelected(), undefined);
	app.selectNextPerson();
	assert.strictEqual(app.notifySelected(), undefined);
	assert.strictEqual(app.notifySelected(), undefined);
	assert.strictEqual(app.notifySelected(), undefined);
	assert.strictEqual(app.notifySelected(), undefined);
	fs.unlinkSync('name_list.txt');
});