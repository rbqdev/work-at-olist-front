import InputStyle from "./style/InputStyle";

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
                ${InputStyle}
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