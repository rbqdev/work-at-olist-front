import Colors from "./style/Colors";
import InputStyle from "./style/InputStyle";

export class InputPasswordComponent extends HTMLElement {

	constructor() {
		super();

		this.inputComponent = this.attachShadow({ mode: "open" });

	}

	static get observedAttributes() {
		return ["label"];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		switch (name) {
			case "label": this.label = newValue; break;
		}
	}

	connectedCallback() {
        this.inputComponent.innerHTML = this.render();
		this.passStrength = this.inputComponent.querySelector(".input-wrap #password-strength");
		this.passSpecifications = Array.from(this.inputComponent.querySelectorAll(".input-wrap #password-specifications .spec"));
        this.handleEvents();
    }

    handleEvents() {
        const _handleInputPassword = () => {
            this.passwordValid = this.validateInputPassword(this.inputPassword.value);
            this.toggleClassesValidAndError(this.inputPassword, this.passwordValid);
         }
         const _handleInputPasswordConfirm = () => {
             this.passwordConfirmValid = this.validateInputPasswordConfirm( this.inputPassword.value, this.inputPasswordConfirm.value);
            if( this.inputPasswordConfirm.value ){
                this.toggleClassesValidAndError(this.inputPasswordConfirm, this.passwordConfirmValid);
            } else {
                this.removeValidateInputClasses(this.inputPasswordConfirm);
            }
         }

         /* Handle and Validate Events */
         this.inputPassword = this.inputComponent.querySelector(".input-wrap.password input");
         this.inputPasswordConfirm = this.inputComponent.querySelector(".input-wrap.password-confirm input");
         this.inputPassword.addEventListener("keyup", () => {
            _handleInputPassword();
            _handleInputPasswordConfirm();
         });
         this.inputPasswordConfirm.addEventListener("keyup", () => {
            _handleInputPassword();
            _handleInputPasswordConfirm();
         });
    }

	render() {
		return `
            <style>
                ${InputStyle}

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
                    height: 8px;
                    background: ${Colors.colorLilac};
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
                    background: ${Colors.colorRed};
                }
                .password-requirements .strength.warning span:not(.step-3) {
                    background: ${Colors.colorYellow};
                }
                .password-requirements .strength.valid span {
                    background: ${Colors.colorGreen};
                }
                .password-requirements .specifications {
                    padding-left: 17px;
                }
                .password-requirements .specifications li {
                    position: relative;
                    margin-bottom: 5px;
                    color: ${Colors.colorDarkLilac};
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
                    background: ${Colors.colorLilac};
                    border-radius: 100%;
                }
                .password-requirements .specifications li.error:before {
                    background: ${Colors.colorRed};
                }
                .password-requirements .specifications li.valid:before {
                    background: ${Colors.colorGreen};
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

	passwordValidated() {
		return {
            passValid: this.passwordValid,
            passConfirmValid: this.passwordConfirmValid
        };
	}

	toggleClassesValidAndError(element, condition) {
        if( element.parentNode ){
            if (condition) {
                element.parentNode.classList.add("valid");
                element.parentNode.classList.remove("error");
            } else {
                element.parentNode.classList.add("error");
                element.parentNode.classList.remove("valid");
            }
        }
    }

    removeValidateInputClasses( element ){
        if( element.parentNode ){
            element.parentNode.classList.remove("valid");
            element.parentNode.classList.remove("error");
        }
    }

	validateInputPassword(value) {
		const regexSixChars = new RegExp(/^[A-Za-z-0-9\d$@$!%*#?&.]{6,}$/).test(value);
		const regexCapital = new RegExp(/^(?=.*[A-Z])/).test(value);
        const regexNumber = new RegExp(/^(?=.*\d)/).test(value);

		let countSteps = 0;
		(regexCapital) ? countSteps++ : null;
		(regexNumber) ? countSteps++ : null;
        (regexSixChars) ? countSteps++ : null;

        this.removeAllClassesPasswordValidation("steps");
        this.removeAllClassesPasswordValidation(null, "requirements");

		if (countSteps > 0) {
            // Strength Steps
            switch (countSteps) {
                case 1: this.passStrength.classList.add("error"); break;
                case 2: this.passStrength.classList.add("warning"); break;
                case 3: this.passStrength.classList.add("valid"); break;
            }
            // Strength Requirements
            let spec = this.passSpecifications;
			(regexSixChars) ? spec[0].classList.add("valid") : spec[0].classList.add("error");
			(regexCapital) ? spec[1].classList.add("valid") : spec[1].classList.add("error");
			(regexNumber) ? spec[2].classList.add("valid") : spec[2].classList.add("error");
        }

		return (regexSixChars && regexCapital && regexNumber);
	}
	validateInputPasswordConfirm(password, passwordConfirm) {
		return (password === passwordConfirm);
	}

	removeAllClassesPasswordValidation(steps = null, requirements = null) {
		if (steps)
			this.passStrength.classList.remove("warning", "error", "valid");

		if (requirements)
			for (const key in this.passSpecifications)
				this.passSpecifications[key].classList.remove("error", "valid");
	}

}

window.customElements.define("password-component", InputPasswordComponent);