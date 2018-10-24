import './assets/css';
import './components';
import { Observable, Toast } from './helpers';
import Api from './providers/api';

class App {

    constructor() {
        this.getClassAttributes();
        this.handleObservableEvents();
        this.handleEvents();
    }

    getClassAttributes(){
        this.appContent = document.getElementById('ca--content');

        this.components = {
            name: document.getElementById('component-fullname'),
            email: document.getElementById('component-email'),
            password: document.getElementById('component-password'),
            submit: document.getElementById('component-submit')
        };

        this.inputs = {
            name: this.components.name.shadowRoot.getElementById('input-c-fullname'),
            email: this.components.email.shadowRoot.getElementById('input-c-email'),
            password: this.components.password.shadowRoot.getElementById('input-c-password'),
            passwordConfirm: this.components.password.shadowRoot.getElementById('input-c-password-confirm'),
            submit: this.components.submit.shadowRoot.getElementById('btn-submit')
        };

        this.formLocked = false;
    }

    handleObservableEvents(){
        this.formValidations = new Observable().createObservable({
            name: false,
            email: false,
            password: false,
            passwordConfirm: false
        }, {
            onGet: () => {},
            onSet: () => {
                let condition = true;
                for (const key in this.formValidations)
                    if(!this.formValidations[key]){
                        condition = false;
                        break;
                    }

                this.validateSubmitButton( condition );
            }
        });
    }

    handleEvents() {
        this.handleNameAndEmailEvents();
        this.handlePasswordsEvents();
        this.handleSubmitEvents();
    }

    handleNameAndEmailEvents(){
        ['name', 'email'].forEach( key => {
            this.inputs[key].addEventListener('keyup', () => {
                this.formValidations[key] = this.components[key].inputValidated();
            });
        });
    }

    handlePasswordsEvents(){
        /*
         * Return object on passwordValidated to validate both inputs passwords
        */
        const _handleValidatePasswords = () => {
            this.formValidations.password = this.components.password.passwordValidated().passValid;
            this.formValidations.passwordConfirm = this.components.password.passwordValidated().passConfirmValid;
        };
        ['password', 'passwordConfirm'].forEach( key => {
            this.inputs[key].addEventListener('keyup', () => {
                _handleValidatePasswords();
            });
        });
    }

    handleSubmitEvents(){
        this.inputs.submit.addEventListener('click', (e) => {
            e.preventDefault();

            this.createUser({
                name: this.inputs.name.value,
                email: this.inputs.email.value,
                password: this.inputs.name.value,
            });
        });
    }

    validateSubmitButton(condition) {
        if (!condition)
            this.inputs.submit.setAttribute('disabled', 'disabled');
        else
            this.inputs.submit.removeAttribute('disabled');
    }

    validateDataBeforeSend() {
        /**
        * If the user get disable the button in any way with invalid data
        * Will stop here and add the error class in the first empty entry
        */
        for (const key in this.formValidations)
            if (!this.formValidations[key]){
                this.inputs[key].parentNode.classList.add('error');
                return;
            }

        return true;
    }

    toggleLockForm(lock) {
        if (typeof lock === 'boolean')
            this.formLocked = lock;
    }

    templateFormSuccess(){
        return `
            <div class="process-done">
                <div>
                    <img src="./assets/img/checkmark.svg" alt="Checkmark" />
                    <h3>Tudo Certo</h3>
                    <p>Verifique sua caixa de entrada para confirmar seu e-mail.</p>
                </div>
            </div>
        `;
    }

    createUser( data ) {
        /**
         * Lock Form when sending data to api
         * Extra validation, case user try remove disable attr manually
         * Or try call unlock form manually also
         */

        let toast = new Toast();

        if( !this.formLocked ){

            if ( this.validateDataBeforeSend() ) {

                this.toggleLockForm(true);
                this.inputs.submit.classList.add('sending');

                new Api().createUserApi(data).then(user => {
                    if (!user.id)
                        toast.showToast('Something wrong! Try again later', 'danger');
                    else {
                        this.appContent.insertAdjacentHTML('beforeend', this.templateFormSuccess());
                        setTimeout(() => {
                            document.body.classList.add('form-sended');
                            document.querySelector('.create-account').remove();
                            this.toggleLockForm(false);
                        }, 700);
                    }
                });

            }
            else
                toast.showToast('Please fill the form correctly');
        }
        else
            toast.showToast('Sending user data, await a moment...');

    }

} new App();