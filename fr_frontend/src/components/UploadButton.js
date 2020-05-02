import React from 'react';

function UploadButton(props) {
    return (
        <div className={props.className}>
            <input
                accept="image/*"
                className="uploadInput"
                id={props.id}
                type="file"
                accept="image/jpeg, image/png"
            />
            <div className="button" id="uploadBtn" onClick={props.onClick}>
                {props.value}
            </div>
        </div>
    );
}

export default UploadButton;