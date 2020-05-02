import React from 'react';

function OutputText(props) {
    return (
        <div className="outputBlock">
            <div>{props.label}</div>
            <div className="outputText" id={props.id}>{props.value}</div>
        </div>
    );
}

export default OutputText;