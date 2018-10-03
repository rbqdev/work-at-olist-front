export class Toast {

    constructor(){
        this.body = document.body;
        this.toast = document.createElement("div");
    }

    showToast( message, theme = "default", position = "bottom", customClass = null, duration = 50000 ) {
        this.toast.innerHTML = this.render({ msg: message, theme: theme, pos: position, class: customClass });
        this.body.appendChild( this.toast );

        setTimeout(() => {
            this.toast.classList.add('show');

            setTimeout(() => {
                this.hideToast();
            }, duration );

        }, 200);
    }

    hideToast(){
        this.body.removeChild( this.toast );
    }

    render( data ){
        return `
            <style>
                #toast {
                    position: fixed;
                    bottom: 8%;
                    left: 50%;
                    width: 80%;
                    max-width: 250px;
                    padding: 12px 10px;
                    background: #333;
                    text-align: center;
                    border-radius: 3px;
                    transform: translate(-50%, 15%);
                    transition: 0.2s ease-in-out;
                    opacity: 0;
                }
                .show #toast {
                    opacity: 1;
                    transform: translate(-50%, 0);
                }
                .toast--text {
                    color: #fff;
                    font-size: 14px;
                }
            </style>
            <div id="toast" class="toast ${ data.class }" data-theme="${ data.theme }" position="${ data.pos }">
                <div class="toast--text">${ data.msg }</div>
            </div>
        `;
    }

}