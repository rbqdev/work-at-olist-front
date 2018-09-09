import './assets/css/main.scss';

(() => {

    /** Global Attributes */
    const intputName = document.getElementById('form-fullname');
    const intputEmail = document.getElementById('form-email');
    const intputPassword = document.getElementById('form-password');
    const intputPassworConfirm = document.getElementById('form-password-confirm');

    /** Global Handle Events */
    intputName.addEventListener( 'keyup', function(e){
        let isValid = _validateInputName( e.target.value );
        _toggleClassesValidAndError( this, isValid );
    });
    intputEmail.addEventListener( 'keyup', function(e){
        let isValid = _validateInputEmail( e.target.value );
        _toggleClassesValidAndError( this, isValid );
    });
    intputPassword.addEventListener( 'keyup', function(e){
        let isValid = _validateInputEmail( e.target.value );
        _toggleClassesValidAndError( this, isValid );
    });
    intputPassworConfirm.addEventListener( 'keyup', function(e){
        let isValid = _validateInputEmail( e.target.value );
        _toggleClassesValidAndError( this, isValid );
    });

    /** Validate Functions */
    function _toggleClassesValidAndError( element, condition ){
        if( condition ){
            element.parentNode.classList.add( 'valid' );
            element.parentNode.classList.remove( 'error' );
        } else {
            element.parentNode.classList.add( 'error' );
            element.parentNode.classList.remove( 'valid' );
        }
    }

    function _validateInputName( value ){
        return ( value && value.length > 3 );
    }

    function _validateInputEmail( value ){
        const regexEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,);
        return ( value && regexEmail.test( value ) );
    }

    function _validateInputName( value ){
        return ( value && value.length > 3 );
    }

})();
