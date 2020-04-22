import React, { Component } from 'react';

function UploadButton(props) {
    return (
        <div>
            <input
                accept="image/*"
                className="uploadInput"
                id={props.id}
                type="file"
                // onChange={}
            />
            <div className="uploadButton" onClick={props.onClick}>
                {props.value}
            </div>
        </div>
    );
}

export default UploadButton;