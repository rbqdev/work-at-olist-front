const axios = require('axios');
const baseURL = 'https://5b9701e429cbd70014a8fd28.mockapi.io/api';

export default class {

    post( endpoint = null, body, callback ) {
        axios.post( baseURL + endpoint, body ).then( response => {
            callback( response );
        }).catch( error => {
            callback( false );
        });
    }

    get( endpoint = null, callback ) {
        axios.get( baseURL + endpoint ).then( response => {
            callback( response );
        }).catch( error => {
            callback( false );
        });
    }

}