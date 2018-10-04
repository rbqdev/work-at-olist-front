import ToastComponent from "./toast.component";

export class Toast {

    constructor(){
        this.body = document.body;
        this.toast = document.createElement("toast-component");
    }

    showToast( message, position = null, duration = 1000 ) {

        this.toast.setAttribute('message', message);
        if( position )
            this.toast.setAttribute('position', position);

        this.body.appendChild( this.toast );
        setTimeout(() => this.hideToast(), duration );
    }

    hideToast(){
        this.toast.shadowRoot.getElementById('toast').classList.add("hidden");
        setTimeout(() => this.body.removeChild( this.toast ), 200 );
    }

}