const should = require('chai').should();
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const Api = require('../src/assets/js/providers/api.js');

const form = {
    name: 'Pink Floyd Test New',
    email: 'pink.floyd@gmail.com',
    password: 'P1nk.Fl0yd',
    password_confirm: 'P1nk.Fl0yd'
}

describe('CreateAccount', () => {

    describe('Verify Types', () => {
        it('should be string type', () => {
            form.name.should.be.a('string');
        })
        it('should be string type', () => {
            form.email.should.be.a('string');
        })
        it('should be string type', () => {
            form.password.should.be.a('string');
        })
        it('should be string type', () => {
            form.password_confirm.should.be.a('string');
        })
    });

    describe('Validate Name', () => {
        it('should be true if name.length > 6', () => {
            let nameLength = (form.name.length > 6);
            nameLength.should.equal( true );
        })
    });

    describe('Validate Email', () => {
        it('should be `true` if email is valid', () => {
            let isValid = new RegExp("[^@]+@[^@]+\\.[^@]+").test(form.email);
            isValid.should.equal( true );
        })
    });

    describe('Validate Password', () => {
        it('should be `true` if password is valid', () => {

            const regexSixChars = new RegExp(/^[A-Za-z-0-9\d$@$!%*#?&.]{6,}$/).test(form.password);
            const regexCapital = new RegExp(/^(?=.*[A-Z])/).test(form.password);
            const regexNumber = new RegExp(/^(?=.*\d)/).test(form.password);

            let isValid = ( regexSixChars && regexCapital && regexNumber );
            isValid.should.equal( true );
        })

    });

    describe('Validate PasswordConfirmation', () => {
        it('should be `true` if password confirmation is valid', () => {
            let isValid = ( form.password === form.password_confirm );
            isValid.should.equal( true );
        })
    });

    let user = null;

    function createUser( data ) {
        let body = {
            name: data.name,
            email: data.email,
            password: data.password
        }

        return new Api().createUserApi( body, XMLHttpRequest ).then( user => {
            if( !user.id )
                throw new Error("Something wrong! Try again later");

            return user;
        });
    };

    before( async () => {
        user = await createUser( form );
    });

    describe('Create User on Api', () => {
        it('should be return `object` with property `id` if user created successfuly', () => {
            user.should.have.property('id');
        })
    });

});