export class InputComponent extends HTMLElement {

	constructor() {
		super();

		this.label = "Input";
		this.type = "text";
		this.name = "text";
		this.value = "";
		this.required = true;

		this.inputValid = false;
		this.inputComponent = this.attachShadow({ mode: "open" });

	}

	static get observedAttributes() {
		return ["label", "type", "name", "value", "required"];
	}

	inputValidated() {
		return this.inputValid;
	}

	attributeChangedCallback(name, oldValue, newValue) {
		switch (name) {
			case "label": this.label = newValue; break;
			case "type": this.type = newValue; break;
			case "name": this.name = newValue; break;
			case "value": this.value = (newValue) ? newValue : ""; break;
			case "required": this.required = (newValue); break;
		}
	}

	connectedCallback() {
		this.inputComponent.innerHTML = this.render();
		this.handleEvents();
	}

	handleEvents(){
		let input = this.inputComponent.querySelector(".input-wrap input");
		input.addEventListener("keyup", () => {
			this.inputValid = this.validateInput(this.type, input.value);
			this.toggleClassesValidAndError(input, this.inputValid);
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
                    border-color: var(--color-valid, #00d598);
                }
                .input-wrap.error input {
                    border-color: var(--color-error, #f9967f);
                }
            </style>

            <div class="input-wrap ${this.type}">
                <label>${this.label}</label>
                <input
                    type="${this.type}"
                    id="input-c-${this.name}"
                    name="${this.name}"
                    value="${this.value}"
                    ${(this.required) ? 'required' : ''}
                />
                <slot name="footer"></slot>
            </div>
        `;
	}

	toggleClassesValidAndError(element, condition) {
		if (condition) {
			element.parentNode.classList.add("valid");
			element.parentNode.classList.remove("error");
		} else {
			element.parentNode.classList.add("error");
			element.parentNode.classList.remove("valid");
		}
	}

	validateInput(type, value) {
		switch (type) {
			case "text":
				return (value && value.length > 6);
				break;
			case "email":
				return (value && new RegExp("[^@]+@[^@]+\\.[^@]+").test(value));
				break;
		}
	}

}

window.customElements.define("input-component", InputComponent);