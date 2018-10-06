import Colors from "./Colors";

const InputStyle = `
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
    .input-wrap input:hover,
    .input-wrap input:focus {
        border-color: ${Colors.colorDarkLilac};
    }
    .input-wrap label {
        margin-bottom: 5px;
        color: ${Colors.colorDarkLilac};
    }
    .input-wrap input {
        padding: 5px 12px;
        min-height: 45px;
        font-size: 1em;
        border: 1px solid ${Colors.colorLilacBorder};
        color: ${Colors.colorDarkGray};
        -webkit-box-shadow: inset 0 3px 10px rgba(0,0,0,.05);
        box-shadow: inset 0 3px 10px rgba(0,0,0,.05);
        outline: 0;
        box-sizing: border-box;
    }
    .input-wrap.valid input {
        border-color: var(--color-valid, ${Colors.colorGreen});
    }
    .input-wrap.error input {
        border-color: var(--color-error, ${Colors.colorRed});
    }
`;

export default InputStyle;