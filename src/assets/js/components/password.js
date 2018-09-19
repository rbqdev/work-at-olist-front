export class InputPasswordComponent extends HTMLElement {

	constructor() {
		super();

		this.label = "";

		this.inputPassword = null;
		this.inputPasswordConfirm = null;
		this.passStrength = null;
		this.passSpecifications = null;

		this.passwordValid = false;
		this.passwordConfirmValid = false;
		this.inputComponent = this.attachShadow({ mode: "open" });

	}

	static get observedAttributes() {
		return ["label"];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		switch (name) {
			case "label":
				this.label = newValue;
				break;
		}
	}


	connectedCallback() {
		this.inputComponent.innerHTML = this.render();

		this.passStrength = this.inputComponent.querySelector(".input-wrap #password-strength");
		this.passSpecifications = Array.from(this.inputComponent.querySelectorAll(".input-wrap #password-specifications .spec"));

		this.inputPassword = this.inputComponent.querySelector(".input-wrap.password input");
		this.inputPassword.addEventListener("keyup", () => {
			this.passwordValid = this.validateInputPassword(this.inputPassword.value);
            this.toggleClassesValidAndError(this.inputPassword, this.passwordValid);

            // Remove class validations of Password Confirm
            // If exists values
            if( this.inputPasswordConfirm.value ){
                this.inputPasswordConfirm.value = "";
                this.removeValidateInputClasses( this.inputPasswordConfirm );
            }
		});

		this.inputPasswordConfirm = this.inputComponent.querySelector(".input-wrap.password-confirm input");
		this.inputPasswordConfirm.addEventListener("keyup", () => {
			this.passwordConfirmValid = this.validateInputPasswordConfirm(this.inputPasswordConfirm.value, this.inputPassword.value);
			this.toggleClassesValidAndError(this.inputPasswordConfirm, this.passwordConfirmValid);
		});
	}

	render() {
		return `
            <style>
                .input-wrap {
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-box-orient: vertical;
                    -webkit-box-direction: normal;
                    -ms-flex-direction: column;
                    flex-direction: column;
                    margin-top: 20px;
                }
                .input-wrap:first-child {
                    margin: 0;
                }
                .input-wrap:focus {
                    border-color: #041bd4;
                }
                .input-wrap label {
                    margin-bottom: 5px;
                    color: #767897;
                }
                .input-wrap input {
                    padding: 5px 12px;
                    min-height: 45px;
                    font-size: 1em;
                    border: 1px solid #b6b9d0;
                    -webkit-box-shadow: inset 0 3px 10px rgba(0,0,0,.05);
                    box-shadow: inset 0 3px 10px rgba(0,0,0,.05);
                    outline: 0;
                    box-sizing: border-box;
                }
                .input-wrap.valid input {
                    border-color: #00d598;
                }
                .input-wrap.error input {
                    border-color: #f9967f;
                }
                ul {
                    padding: 0;
                    margin: 0;
                }
                .password-requirements .strength {
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    -ms-flex-pack: distribute;
                    justify-content: space-around;
                }
                .password-requirements .strength span {
                    height: 7px;
                    background: #eaeaf4;
                    border-radius: 5px;
                    -webkit-box-flex: 1;
                    -ms-flex-positive: 1;
                    flex-grow: 1;
                    margin: 10px 0 15px;
                }
                .password-requirements .strength span:nth-child(2) {
                    margin-left: 8px;
                    margin-right: 8px;
                }
                .password-requirements .strength.error span:nth-child(1) {
                    background: #f9967f;
                }
                .password-requirements .strength.warning span:not(.step-3) {
                    background: #f8bd00;
                }
                .password-requirements .strength.valid span {
                    background: #00d598;
                }
                .password-requirements .specifications {
                    padding-left: 17px;
                }
                .password-requirements .specifications li {
                    position: relative;
                    margin-bottom: 5px;
                    color: #767897;
                }
                .password-requirements .specifications li:last-child {
                    margin: 0;
                }
                .password-requirements .specifications li:before {
                    content: '';
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    top: 5px;
                    left: -17px;
                    background: #eaeaf4;
                    border-radius: 100%;
                }
                .password-requirements .specifications li.error {
                    color: #f9967f;
                }
                .password-requirements .specifications li.error:before {
                    background: #f9967f;
                }
                .password-requirements .specifications li.valid {
                    color: #00d598;
                }
                .password-requirements .specifications li.valid:before {
                    background: #00d598;
                }
            </style>

            <div class="input-wrap password">
                <label>${this.label}</label>
                <input
                    type="password"
                    id="input-c-password"
                    name="password"
                    required
                />
                <div class="password-requirements">
                    <div id="password-strength" class="strength">
                        <span class="step step-1"></span>
                        <span class="step step-2"></span>
                        <span class="step step-3"></span>
                    </div>
                    <div id="password-specifications" class="specifications">
                        <ul>
                            <li class="spec six">Pelo menos 6 caracteres</li>
                            <li class="spec capital">Pelo menos 1 letra maiúscula</li>
                            <li class="spec number">Pelo menos 1 número</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="input-wrap password-confirm">
                <label>Confirmar ${this.label}</label>
                <input
                    type="password"
                    id="input-c-password-confirm"
                    name="password"
                    required
                />
            </div>
        `;
	}

	passwordValidated(confirm = null) {
		return (!confirm) ? this.passwordValid : this.passwordConfirmValid;
	}

	toggleClassesValidAndError(element, condition) {
        if( element.parentNode )
            if (condition) {
                element.parentNode.classList.add("valid");
                element.parentNode.classList.remove("error");
            } else {
                element.parentNode.classList.add("error");
                element.parentNode.classList.remove("valid");
            }
    }

    removeValidateInputClasses( element ){
        if( element.parentNode )
            element.parentNode.classList.remove("valid");
            element.parentNode.classList.remove("error");
    }

	validateInputPassword(value) {
		const regexSixChars = new RegExp(/^[A-Za-z-0-9\d$@$!%*#?&.]{6,}$/).test(value);
		const regexCapital = new RegExp(/^(?=.*[A-Z])/).test(value);
		const regexNumber = new RegExp(/^(?=.*\d)/).test(value);

		let countSteps = 0;
		(regexCapital) ? countSteps++ : null;
		(regexNumber) ? countSteps++ : null;
		(regexSixChars) ? countSteps++ : null;

		switch (countSteps) {
			case 0:
				this.removeAllClassesPasswordValidation("steps");
				break;
			case 1:
				this.removeAllClassesPasswordValidation("steps");
				this.passStrength.classList.add("error");
				break;
			case 2:
				this.removeAllClassesPasswordValidation("steps");
				this.passStrength.classList.add("warning");
				break;
			case 3:
				this.removeAllClassesPasswordValidation("steps");
				this.passStrength.classList.add("valid");
				break;
		}

		if (countSteps > 0) {
			this.removeAllClassesPasswordValidation(null, "requirements");
			(regexSixChars) ? this.passSpecifications[0].classList.add("valid") : this.passSpecifications[0].classList.add("error");
			(regexCapital) ? this.passSpecifications[1].classList.add("valid") : this.passSpecifications[1].classList.add("error");
			(regexNumber) ? this.passSpecifications[2].classList.add("valid") : this.passSpecifications[2].classList.add("error");
		} else {
			this.removeAllClassesPasswordValidation(null, "requirements");
		}

		return (regexSixChars && regexCapital && regexNumber);
	}
	validateInputPasswordConfirm(value1, value2) {
		return (value1 === value2);
	}

	removeAllClassesPasswordValidation(steps = null, requirements = null) {
		if (steps) {
			this.passStrength.classList.remove("warning");
			this.passStrength.classList.remove("error");
			this.passStrength.classList.remove("valid");
		}
		if (requirements) {
			for (const key in this.passSpecifications) {
				this.passSpecifications[key].classList.remove("error");
				this.passSpecifications[key].classList.remove("valid");
			}
		}
	}

}

window.customElements.define("password-component", InputPasswordComponent);