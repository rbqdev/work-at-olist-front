const should = require('chai').should();
const axios = require('axios');

const baseURL = 'https://5b9701e429cbd70014a8fd28.mockapi.io/api';
const form = {
    name: 'Pink Floyd',
    email: 'pink.floyd@gmail.com',
    password: 'P1nk.Fl0yd',
    password_confirm: 'P1nk.Fl0yd'
}

describe('CreateAccount', function(){

    describe('Verify Types', function(){
        it('should be string type', function () {
            form.name.should.be.a('string');
        })
        it('should be string type', function () {
            form.email.should.be.a('string');
        })
        it('should be string type', function () {
            form.password.should.be.a('string');
        })
        it('should be string type', function () {
            form.password_confirm.should.be.a('string');
        })
    });

    describe('Validate Name', function(){
        it('should be true if name.length > 6', function () {
            let nameLength = (form.name.length > 6);
            nameLength.should.equal( true );
        })
    });

    describe('Validate Email', function(){
        it('should be `true` if email is valid', function () {
            let isValid = new RegExp("[^@]+@[^@]+\\.[^@]+").test(form.email);
            isValid.should.equal( true );
        })
    });

    describe('Validate Password', function(){
        it('should be `true` if password is valid', function () {

            const regexSixChars = new RegExp(/^[A-Za-z-0-9\d$@$!%*#?&.]{6,}$/).test(form.password);
            const regexCapital = new RegExp(/^(?=.*[A-Z])/).test(form.password);
            const regexNumber = new RegExp(/^(?=.*\d)/).test(form.password);

            let isValid = ( regexSixChars && regexCapital && regexNumber );
            isValid.should.equal( true );
        })

    });

    describe('Validate PasswordConfirmation', function(){
        it('should be `true` if password is valid', function () {
            let isValid = ( form.password === form.password_confirm );
            isValid.should.equal( true );
        })
    });

    describe('Create Account Api', function(){
        it('should be return `Obj User Created` if user created successfuly', function () {
            let body = {
                name: form.name,
                email: form.email,
                password: form.password
            }
            axios.post( baseURL + '/user', body ).then( response => {
                response.should.be.a( 'object' );
            }).catch( error => {
                console.log( error );
            });
        })
    });

});