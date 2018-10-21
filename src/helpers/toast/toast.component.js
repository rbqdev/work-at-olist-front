export default class ToastComponent extends HTMLElement {

    constructor() {
        super();

        this.message = null;
        this.position = "bottom-center";
        this.toastComponent = this.attachShadow({ mode: "open" });

        this.styleAnimations = this.animationsMetrics();
    }

    static get observedAttributes() {
        return ["message", "position", "theme"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "message": this.message = newValue; break;
            case "position": this.position = newValue; break;
            case "theme": this.theme = newValue; break;
        }
    }

    connectedCallback() {
        this.toastComponent.innerHTML = this.render();
    }

    animationsMetrics() {
        let metrics = {
            "bottom-center": {
                bottom: "8%", left: "50%", top: "auto", right: "auto",
                from: { translateY: "15%", translateX: "-50%" }, to: { translateY: "0%", translateX: "-50%" }
            },
            "top-right": {
                bottom: "auto", left: "auto", top: "2%", right: "2%",
                from: { translateY: "-10%", translateX: "0" }, to: { translateY: "0", translateX: "0" }
            }
        }

        let style = '';
        for (const key in metrics) {
            style += `
                .toast[data-position="${key}"] {
                    bottom: ${metrics[key].bottom};
                    left: ${metrics[key].left};
                    top: ${metrics[key].top};
                    right: ${metrics[key].right};
                    -webkit-animation: showToast-${key} .3s forwards;
                    animation: showToast-${key} .3s forwards;
                }
                @-webkit-keyframes showToast-${key} {
                    from { opacity: 0; transform: translate(${metrics[key].from.translateX}, ${metrics[key].from.translateY}); }
                    to { opacity: 1; transform: translate(${metrics[key].to.translateX}, ${metrics[key].to.translateY}); }
                }
                @keyframes showToast-${key} {
                    from { opacity: 0; transform: translate(${metrics[key].from.translateX}, ${metrics[key].from.translateY}); }
                    to { opacity: 1; transform: translate(${metrics[key].to.translateX}, ${metrics[key].to.translateY}); }
                }
            `
        }

        return style;
    }

    render() {

        return `
            <style>
                .toast {
                    position: fixed;
                    width: 80%;
                    max-width: 250px;
                    padding: 12px 10px;
                    background: #333;
                    color: #fff;
                    text-align: center;
                    border-radius: 3px;
                    transition: 0.2s ease-in-out;
                }
                .toast--text {
                    font-size: 14px;
                }
                .toast.hidden {
                    background: transparent;
                    color: transparent;
                }

                .toast[data-theme="success"]{ background: #00d598; }
                .toast[data-theme="info"]{ background: #041bd4; }
                .toast[data-theme="danger"]{ background: #f9967f; }
                .toast[data-theme="warning"]{ background: #f8bd00; }

                ${this.styleAnimations}
            </style>
            <div id="toast" class="toast" data-position="${this.position}" data-theme="${this.theme}">
                <div class="toast--text">${ this.message}</div>
            </div>
        `;
    }

}

window.customElements.define("toast-component", ToastComponent);