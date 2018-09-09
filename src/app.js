import './assets/css/main.scss';

(() => {

    /** Global Attributes */
    const intputName = document.getElementById('form-fullname');
    const intputEmail = document.getElementById('form-email');
    const intputPassword = document.getElementById('form-password');
    const intputPassworConfirm = document.getElementById('form-password-confirm');
    const passStrength = document.getElementById('password-strength');
    const passSpecifications = Array.from(document.querySelectorAll('#password-specifications .spec'));

    /** Global Handle Events */
    intputName.addEventListener( 'keyup', function(e){
        let isValid = validateInputName( e.target.value );
        toggleClassesValidAndError( this, isValid );
    });
    intputEmail.addEventListener( 'keyup', function(e){
        let isValid = validateInputEmail( e.target.value );
        toggleClassesValidAndError( this, isValid );
    });
    intputPassword.addEventListener( 'keyup', function(e){
        let isValid = validateInputPassword( e.target.value );
        toggleClassesValidAndError( this, isValid );
    });
    // intputPassworConfirm.addEventListener( 'keyup', function(e){
    //     let isValid = validatePasswordConfirmation( e.target.value );
    //     toggleClassesValidAndError( this, isValid );
    // });

    /** Validate Functions */
    function toggleClassesValidAndError( element, condition ){
        if( condition ){
            element.parentNode.classList.add( 'valid' );
            element.parentNode.classList.remove( 'error' );
        } else {
            element.parentNode.classList.add( 'error' );
            element.parentNode.classList.remove( 'valid' );
        }
    }

    function validateInputName( value ){
        return ( value && value.length > 3 );
    }

    function validateInputEmail( value ){
        const regexEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,).test( value );

        return ( value && regexEmail );
    }

    function validateInputPassword( value ){

        const regexSixChars = new RegExp(/^[A-Za-z-0-9\d$@$!%*#?&]{6,}$/).test( value );
        const regexCapital = new RegExp(/^(?=.*[A-Z])/).test( value );
        const regexNumber = new RegExp(/^(?=.*\d)/).test( value );

        let countSteps = 0;
        ( regexCapital ) ? countSteps++ : null;
        ( regexNumber ) ? countSteps++ : null;
        ( regexSixChars ) ? countSteps++ : null;

        function _removeAllClasses( steps = null, requirements = null ){
            if( steps ){
                passStrength.classList.remove( 'warning' );
                passStrength.classList.remove( 'error' );
                passStrength.classList.remove( 'valid' );
            }
            if( requirements ){
                for (const key in passSpecifications) {
                    passSpecifications[ key ].classList.remove('error');
                    passSpecifications[ key ].classList.remove('valid');
                }
            }
        }

        switch (countSteps) {
            case 0:
                 _removeAllClasses( 'steps' );
                break;
            case 1:
                 _removeAllClasses( 'steps' );
                passStrength.classList.add( 'error' );
                break;
            case 2:
                 _removeAllClasses( 'steps' );
                passStrength.classList.add( 'warning' );
                break;
            case 3:
                 _removeAllClasses( 'steps' );
                passStrength.classList.add( 'valid' );
                break;
        }

        if( countSteps > 0 ){
            _removeAllClasses( null, 'requirements' );
            ( regexSixChars ) ? passSpecifications[0].classList.add('valid') : passSpecifications[0].classList.add('error');
            ( regexCapital ) ? passSpecifications[1].classList.add('valid') : passSpecifications[1].classList.add('error');
            ( regexNumber ) ? passSpecifications[2].classList.add('valid') : passSpecifications[2].classList.add('error');
        } else {
            _removeAllClasses( null, 'requirements' );
        }

        return ( regexSixChars && regexCapital && regexNumber  );
    }

})();
