import Colors from "./style/Colors";

export class SubmitComponent extends HTMLElement {

	constructor() {
		super();

		this.label = "Send";
		this.disabled = true;

		this.inputComponent = this.attachShadow({ mode: "open" });

	}

	static get observedAttributes() {
		return ["label", "disabled"];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		switch (name) {
			case "label": this.label = newValue; break;
			case "disabled": this.disabled = newValue; break;
		}
	}

	connectedCallback() {
		this.inputComponent.innerHTML = this.render();
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
                .input-wrap .btn-submit {
                    position: relative;
                    height: 52px;
                    border: 0;
                    background: var(--submit-bg, ${Colors.colorGreen});
                    color: var(--submit-color, #fff);
                    font-size: 16px;
                    font-weight: 500;
                    outline: none;
                    cursor: pointer;
                }
                .input-wrap .btn-submit:not([disabled]):hover {
                    background: ${Colors.colorLightGreen};
                }
                .input-wrap .btn-submit .loader {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: ${Colors.colorGreen};
                    left: 0;
                    top: 0;
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-box-align: center;
                    -ms-flex-align: center;
                    align-items: center;
                    -webkit-box-pack: center;
                    -ms-flex-pack: center;
                    justify-content: center;
                    opacity: 0;
                    visibility: hidden;
                    -webkit-transition: 0.2s all;
                    transition: 0.2s all;
                }
                .input-wrap .btn-submit .loader i {
                    width: 8px;
                    height: 8px;
                    display: block;
                    background: #fff;
                    border-radius: 100%;
                    margin: 0 5px;
                }
                .input-wrap .btn-submit.sending .loader {
                    opacity: 1;
                    visibility: visible;
                }
                .input-wrap .btn-submit.sending .loader i {
                    -webkit-animation: spinner 1.2s ease-in-out infinite;
                    animation: spinner 1.2s ease-in-out infinite;
                }
                .input-wrap .btn-submit.sending .loader i:nth-child(1) {
                    -webkit-animation-delay: 200ms;
                    animation-delay: 200ms;
                }
                .input-wrap .btn-submit.sending .loader i:nth-child(2) {
                    -webkit-animation-delay: 400ms;
                    animation-delay: 400ms;
                }
                .input-wrap .btn-submit.sending .loader i:nth-child(3) {
                    -webkit-animation-delay: 600ms;
                    animation-delay: 600ms;
                }
                .input-wrap .btn-submit:disabled {
                    opacity: 0.5;
                    cursor: initial;
                }
                @-webkit-keyframes spinner {
                    0% { -webkit-transform: scale(1); transform: scale(1); }
                    25% { -webkit-transform: scale(1.4); transform: scale(1.4); }
                    50% { -webkit-transform: scale(1); transform: scale(1); }
                    75% { -webkit-transform: scale(.5); transform: scale(.5); }
                    100% { -webkit-transform: scale(1); transform: scale(1); }
                }
                @keyframes spinner {
                    0% { -webkit-transform: scale(1); transform: scale(1); }
                    25% { -webkit-transform: scale(1.4); transform: scale(1.4); }
                    50% { -webkit-transform: scale(1); transform: scale(1); }
                    75% { -webkit-transform: scale(.5); transform: scale(.5); }
                    100% { -webkit-transform: scale(1); transform: scale(1); }
                }
            </style>

            <div class="input-wrap submit">
                <button type="button" id="btn-submit" class="btn-submit" ${ (this.disabled === "true") ? "disabled" : ""}>
                    <span class="loader">
                        <i></i>
                        <i></i>
                        <i></i>
                    </span>
                    <span class="text">${this.label}</span>
                </button>
            </div>
        `;
	}

}

window.customElements.define("submit-component", SubmitComponent);