import api from "./assets/js/api.js";
import "./assets/js/components/input.js";
import "./assets/js/components/password.js";
import "./assets/js/components/submit.js";

(() => {

	const componentFullname = document.getElementById("component-fullname");
	const inputName = componentFullname.shadowRoot.getElementById("input-c-fullname");

	const componentEmail = document.getElementById("component-email");
	const inputEmail = componentEmail.shadowRoot.getElementById("input-c-email");

	const componentPassword = document.getElementsByTagName("password-component")[0];
	const inputPassword = componentPassword.shadowRoot.getElementById("input-c-password");
	const inputPasswordConfirm = componentPassword.shadowRoot.getElementById("input-c-password-confirm");

	const btnSubmit = document.getElementsByTagName("submit-component")[0].shadowRoot.getElementById("btn-submit");

	const formValidations = {
		name: { value: null, isValid: false },
		email: { value: null, isValid: false },
		password: { value: null, isValid: false },
		password_confirm: { value: null, isValid: false }
	};

	inputName.addEventListener("keyup", function (e) {
		formValidations.name.value = e.target.value;
		formValidations.name.isValid = componentFullname.inputValidated();
		validateSubmitButton();
	});
	inputEmail.addEventListener("keyup", function (e) {
		formValidations.email.value = e.target.value;
		formValidations.email.isValid = componentEmail.inputValidated();
		validateSubmitButton();
	});

	// Return object on passwordValidated to validate both inputs passwords
	inputPassword.addEventListener("keyup", function (e) {
		formValidations.password.value = e.target.value;
		formValidations.password.isValid = componentPassword.passwordValidated().passValid;
		formValidations.password_confirm.isValid = componentPassword.passwordValidated().passConfirmValid;
		validateSubmitButton();
	});
	inputPasswordConfirm.addEventListener("keyup", function (e) {
		formValidations.password_confirm.value = e.target.value;
		formValidations.password.isValid = componentPassword.passwordValidated().passValid;
		formValidations.password_confirm.isValid = componentPassword.passwordValidated().passConfirmValid;
		validateSubmitButton();
	});

	btnSubmit.addEventListener("click", function (e) {
		e.preventDefault();
		sendUser(this);
	});

	function validateSubmitButton() {
		for (const key in formValidations) {
			if (!formValidations[key].isValid) {
				btnSubmit.setAttribute("disabled", "disabled");
				return;
			}
		}
		btnSubmit.removeAttribute("disabled");
	}

	function sendUser(button) {
		for (const key in formValidations)
			if (!formValidations[key].isValid)
				return;

		button.classList.add("sending");

		let body = {
			name: formValidations.name.value,
			email: formValidations.email.value,
			password: formValidations.password.value
		};

		api.request("POST", "/user", body, null, (response) => {
			if (response)
				document.body.classList.add("form-sended");

			button.classList.remove("sending");
		});
	}

})();