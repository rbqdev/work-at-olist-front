import "./assets/css";
import "./assets/js/components";
import { Toast } from "./assets/js/helpers";
import Api from "./assets/js/api";

class App {

	constructor(){

		this.componentFullname = document.getElementById("component-fullname");
		this.componentPassword = document.getElementById("component-password");
		this.componentEmail = document.getElementById("component-email");
		this.componentSubmit = document.getElementById("component-submit");

		this.inputName = this.componentFullname.shadowRoot.getElementById("input-c-fullname");
		this.inputEmail = this.componentEmail.shadowRoot.getElementById("input-c-email");
		this.inputPassword = this.componentPassword.shadowRoot.getElementById("input-c-password");
		this.inputPasswordConfirm = this.componentPassword.shadowRoot.getElementById("input-c-password-confirm");
		this.btnSubmit = this.componentSubmit.shadowRoot.getElementById("btn-submit");

		this.formValidations = {
			name: { value: null, isValid: false },
			email: { value: null, isValid: false },
			password: { value: null, isValid: false },
			password_confirm: { value: null, isValid: false }
		};

		this.formLocked = false;

		this.handleInputEvents();

	}

	handleInputEvents(){

		this.inputName.addEventListener("keyup", (e) => {
			this.formValidations.name.value = e.target.value;
			this.formValidations.name.isValid = this.componentFullname.inputValidated();
			this.validateSubmitButton();
		});

		this.inputEmail.addEventListener("keyup", (e) => {
			this.formValidations.email.value = e.target.value;
			this.formValidations.email.isValid = this.componentEmail.inputValidated();
			this.validateSubmitButton();
		});

		// Return object on passwordValidated to validate both inputs passwords
		const _handleValidatePasswords = (input) => {
			this.formValidations.password.value = input.target.value;
			this.formValidations.password.isValid = this.componentPassword.passwordValidated().passValid;
			this.formValidations.password_confirm.isValid = this.componentPassword.passwordValidated().passConfirmValid;
			this.validateSubmitButton();
		};
		this.inputPassword.addEventListener("keyup", (e) => {
			_handleValidatePasswords(e);
		});
		this.inputPasswordConfirm.addEventListener("keyup", (e) => {
			_handleValidatePasswords(e);
		});

		this.btnSubmit.addEventListener("click", (e) => {
			e.preventDefault();

			if( !this.formLocked )
				this.createUser();
		});
	}

	validateSubmitButton() {
		if(!this.validateDataBeforeSend())
			this.btnSubmit.setAttribute("disabled", "disabled");
		else
			this.btnSubmit.removeAttribute("disabled");
	}

	validateDataBeforeSend(){
		for (const key in this.formValidations)
			if (!this.formValidations[key].isValid)
				return;

		return true;
	}

	toggleLockForm( lock ){
		if( typeof loock === "boolean" )
			this.formLocked = lock;
	}

	createUser(){
		// Extra validation, case user try remove disable attr manually
		// Or try call unlock form manually also
		let toast = new Toast();
		if( this.validateDataBeforeSend() ){

			this.toggleLockForm( true );
			this.btnSubmit.classList.add("sending");

			new Api().createUserApi( this.formValidations ).then( user => {
				if( !user.id )
					toast.showToast("Something wrong! Try again later", "danger");
				else
					document.body.classList.add("form-sended");

				this.btnSubmit.classList.remove("sending");
				this.toggleLockForm( false );
			});

		} else {
			toast.showToast("Please fill the form correctly");
		}
	}

} new App();