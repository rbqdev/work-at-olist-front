class Api {

    constructor(){
        // this.baseURL = 'http://5b9701e429cbd70014a8fd28.mockapi.io/api';
        this.baseURL = 'https://reqres.in/api';
    }

    request(method, endpoint = null, body = null, xhrInject = null) {
        return new Promise((resolve, reject) => {
            const xhr = (!xhrInject) ? new XMLHttpRequest() : new xhrInject();
            xhr.open(method, this.baseURL + endpoint, true);
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xhr.onload = function () {
                if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 201)){
                    resolve({
                        status: 200,
                        data: (typeof xhr.responseText === 'string') ? JSON.parse(xhr.responseText) : xhr.responseText
                    });
                } else{
                    reject({ status: this.status, statusText: xhr.statusText });
                }
            }
            xhr.onerror = function () {
                reject({ status: this.status, statusText: xhr.statusText });
            };
            if (method === 'POST' && body)
                xhr.send(JSON.stringify(body));
            else
                xhr.send(null);
        });
    }

    createUserApi( data, xhr = null ) {

        if( data && typeof data === 'object' ){

            let body = {
                name: data.name.value,
                email: data.email.value,
                password: data.password.value
            };

            return this.request("POST", "/users", body, xhr )
            .then( response => {
                return (response && response.data) ? response.data : null;
            }).catch( error => {
                return error;
            });

        }

    }

}

module.exports = Api;