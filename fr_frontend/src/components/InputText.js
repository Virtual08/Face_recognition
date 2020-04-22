import React, { Component } from 'react';

function InputText(props) {
    return (
        <label>{props.value} <input type={props.type}  name={props.name} onChange={props.onChange}></input></label>
    );
}

export default InputText;