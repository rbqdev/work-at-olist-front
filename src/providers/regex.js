class RegexRules {

    getRegexLength( value, minLength ) {
        if( typeof value === 'string' )
            return ( value.length >= minLength )
        else
            return false
    }

    getRegexEmail( value ) {
        return new RegExp("[^@]+@[^@]+\\.[^@]+").test(value);
    }

    getRegexPassword( value ) {
        return {
            regexSixChars: new RegExp(/^[A-Za-z-0-9\d$@$!%*#?&.]{6,}$/).test(value),
            regexCapital: new RegExp(/^(?=.*[A-Z])/).test(value),
            regexNumber: new RegExp(/^(?=.*\d)/).test(value)
        };
    }

}

module.exports = RegexRules;