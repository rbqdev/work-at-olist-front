const baseURL = 'https://5b9701e429cbd70014a8fd28.mockapi.io/api';

module.exports = {

    request( method, endpoint = null, body = null, callback ) {
        const xhr = new XMLHttpRequest();
        xhr.open( method, baseURL + endpoint, true);
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        xhr.onload = function () {
            if (xhr.readyState === 4 && ( xhr.status === 200 || xhr.status === 201)) {
                callback( xhr.responseText );
            }
            else {
                callback( false );
            }
        }
        if( method === 'POST' && body )
            xhr.send( JSON.stringify(body) );
        else
            xhr.send(null);

    }

}