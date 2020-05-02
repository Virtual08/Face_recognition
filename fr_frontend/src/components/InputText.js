import React from 'react';

function InputText(props) {
    return (
        <div className="inputBlock">
            <div>{props.value}</div>
            <input className="inputText" type={props.type}  name={props.name} onChange={props.onChange}></input>
        </div>
    );
}

export default InputText;