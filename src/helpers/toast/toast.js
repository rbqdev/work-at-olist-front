import ToastComponent from "./toast.component";

export class Toast {

    constructor() {
        this.body = document.body;
        this.toast = document.createElement("toast-component");
    }

    showToast(message, theme = "default", position = "bottom-center", duration = 2000) {
        this.toast.setAttribute('message', message);
        this.toast.setAttribute('theme', theme);
        this.toast.setAttribute('position', position);

        this.body.appendChild(this.toast);
        setTimeout(() => this.hideToast(), duration);
    }

    hideToast() {
        this.toast.shadowRoot.getElementById('toast').classList.add("hidden");
        setTimeout(() => this.body.removeChild(this.toast), 200);
    }

}