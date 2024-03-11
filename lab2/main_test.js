const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');
const fs = require('node:fs');      
const util = require('util');
const writeFile = util.promisify(fs.writeFile);


// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary


test("Test Mailsystem" , () => {
    const mailsystem = new MailSystem();
    const mock_fn = test.mock.fn( mailsystem.write );    
    assert.strictEqual( mock_fn("Writer") , "Congrats, Writer!" );


    mock_fn.mock.mockImplementation( mailsystem.send );
    Math.random = () => 0.8;
    assert.strictEqual( mock_fn("Sender" , "send_context") , true );

    Math.random = () => 0.3;
    assert.strictEqual( mock_fn("Sender" , "send_context") , false );

});


test('Test Application', async () => {

    const my_name_list = "p1\np2\np3"
    await writeFile( "name_list.txt" , my_name_list , 'utf-8');
    const application = new Application();

    //test getname
    const [ application_people , application_selected ] = await application.getNames();
    assert.deepStrictEqual( application_people , ["p1" , "p2" , "p3"] );
    assert.deepStrictEqual( application_selected , [] );



    //test getrandom person
    const random_person = application.getRandomPerson();
    assert.ok( application_people.includes( random_person ) );



    function mock_selNext(){
        return application.selectNextPerson();
    }
    const mock_sel = test.mock.fn(mock_selNext);

    //test selectNextPerson
    application.getRandomPerson = () => 'p1';
    assert.equal( mock_sel() , 'p1' );

    application.getRandomPerson = () => 'p2';
    assert.equal( mock_sel() , 'p2' );
    
    application.getRandomPerson = () => ['p3']
    assert.equal( mock_sel() , 'p3' );

    assert.equal( mock_sel() , null );


    let cnt = 1;
    application.getRandomPerson = () => {
        if( cnt % 2 ){
            cnt--;
            return 'p1';
        }else{
            return 'p2';
        }

    }
    
    application.selected = ['p1'];
    assert.strictEqual( application.selectNextPerson() , 'p2' );
    assert.deepStrictEqual( application.selected , ['p1' , 'p2'] );

    //test notifyselected
    application.selected = ['p1','p2','p3'];

    const mock_write = test.mock.fn(MailSystem.prototype.write);
    const mock_send  = test.mock.fn(MailSystem.prototype.send );

    application.mailSystem.write = mock_write;
    application.mailSystem.send = mock_send;

    application.notifySelected();
    assert.strictEqual( application.mailSystem.write.mock.callCount() , 3 );
    assert.strictEqual( application.mailSystem.send.mock.callCount() , 3 );

    application.mailSystem = new MailSystem();
    const res = application.notifySelected();
    assert.strictEqual(res, undefined);


    
    fs.unlinkSync('name_list.txt');


});
