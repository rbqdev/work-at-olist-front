import "./assets/css/main.scss";

(() => {

	/** Global Attributes */
	const intputName = document.getElementById("form-fullname");
	const intputEmail = document.getElementById("form-email");
	const intputPassword = document.getElementById("form-password");
	const intputPassworConfirm = document.getElementById("form-password-confirm");
	const passStrength = document.getElementById("password-strength");
	const passSpecifications = Array.from(document.querySelectorAll("#password-specifications .spec"));
	const btnSubmit = document.getElementById("btn-submit");
	const formValidations = {
		name: false,
		email: false,
		password: false,
		password_confirm: false
	};

	/** Global Handle Events */
	intputName.addEventListener("keyup", function (e) {
		let isValid = validateInputName(e.target.value);
		toggleClassesValidAndError(this, isValid);
		formValidations["name"] = isValid;
		validateSubmitButton();
	});

	intputEmail.addEventListener("keyup", function (e) {
		let isValid = validateInputEmail(e.target.value);
		toggleClassesValidAndError(this, isValid);
		formValidations["email"] = isValid;
		validateSubmitButton();
	});

	intputPassword.addEventListener("keyup", function (e) {
		let isValid = validateInputPassword(e.target.value);
		toggleClassesValidAndError(this, isValid);
		formValidations["password"] = isValid;
		validateSubmitButton();

		if (intputPassworConfirm.value.length > 0) {
			intputPassworConfirm.value = "";
			intputPassworConfirm.parentNode.classList.remove("error");
			intputPassworConfirm.parentNode.classList.remove("valid");
		}
	});

	intputPassworConfirm.addEventListener("keyup", function (e) {
		let isValid = validateInputPasswordConfirm(e.target.value);
		toggleClassesValidAndError(this, isValid);
		formValidations["password_confirm"] = isValid;
		validateSubmitButton();
	});

	btnSubmit.addEventListener("click", function (e) {
		e.preventDefault();
		sendUser(this);
	});

	/** Validate Functions */
	function toggleClassesValidAndError(element, condition) {
		if (condition) {
			element.parentNode.classList.add("valid");
			element.parentNode.classList.remove("error");
		} else {
			element.parentNode.classList.add("error");
			element.parentNode.classList.remove("valid");
		}
	}

	function validateInputName(value) {
		return (value && value.length > 6);
	}

	function validateInputEmail(value) {
		const regexEmail = new RegExp("[^@]+@[^@]+\\.[^@]+").test(value);

		return (value && regexEmail);
	}

	function validateInputPassword(value) {

		const regexSixChars = new RegExp(/^[A-Za-z-0-9\d$@$!%*#?&.]{6,}$/).test(value);
		const regexCapital = new RegExp(/^(?=.*[A-Z])/).test(value);
		const regexNumber = new RegExp(/^(?=.*\d)/).test(value);

		let countSteps = 0;
		(regexCapital) ? countSteps++ : null;
		(regexNumber) ? countSteps++ : null;
		(regexSixChars) ? countSteps++ : null;

		function _removeAllClasses(steps = null, requirements = null) {
			if (steps) {
				passStrength.classList.remove("warning");
				passStrength.classList.remove("error");
				passStrength.classList.remove("valid");
			}
			if (requirements) {
				for (const key in passSpecifications) {
					passSpecifications[key].classList.remove("error");
					passSpecifications[key].classList.remove("valid");
				}
			}
		}

		switch (countSteps) {
		case 0:
			_removeAllClasses("steps");
			break;
		case 1:
			_removeAllClasses("steps");
			passStrength.classList.add("error");
			break;
		case 2:
			_removeAllClasses("steps");
			passStrength.classList.add("warning");
			break;
		case 3:
			_removeAllClasses("steps");
			passStrength.classList.add("valid");
			break;
		}

		if (countSteps > 0) {
			_removeAllClasses(null, "requirements");
			(regexSixChars) ? passSpecifications[0].classList.add("valid") : passSpecifications[0].classList.add("error");
			(regexCapital) ? passSpecifications[1].classList.add("valid") : passSpecifications[1].classList.add("error");
			(regexNumber) ? passSpecifications[2].classList.add("valid") : passSpecifications[2].classList.add("error");
		} else {
			_removeAllClasses(null, "requirements");
		}

		return (regexSixChars && regexCapital && regexNumber);
	}

	function validateInputPasswordConfirm(value) {
		return (value === intputPassword.value);
	}

	function validateSubmitButton() {
		for (const key in formValidations) {
			if (!formValidations[key]) {
				btnSubmit.setAttribute("disabled", "disabled");
				return;
			}
		}
		btnSubmit.removeAttribute("disabled");
	}

	function sendUser(button) {
		for (const key in formValidations) {
			if (!formValidations[key])
				return;
		}
		button.classList.add("sending");
		setTimeout(() => {
			document.body.classList.add("form-sended");
		}, 3000);
	}

})();
