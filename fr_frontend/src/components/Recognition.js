import React, { Component } from 'react';
import people from './people.svg';
import UploadButton from './UploadButton';

class Recognition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      imagePreviewUrl: people,
      result: null
    }
  };

  fileUploadHandler = event => {
    document.getElementById('recognitionUpload').click();
    document.getElementById('recognitionUpload').onchange = () => {

      var files = document.getElementById('recognitionUpload').files;

      if (files.length > 0) {
        this.setState({
          selectedFile: files[0],
          imagePreviewUrl: URL.createObjectURL(files[0]),
          result: null
        });
      }
    }
  }

  recognitionHandler = event => {
    if (this.state.selectedFile == null) return;

    var formData = new FormData();
    formData.append('file', this.state.selectedFile);

    fetch('http://172.17.184.34:32710/recognize', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data'
      },
      body: formData
    })
      .then(response => response.json())
      .then(result => { this.setState(result) });
  }

  render() {
    return (
      <div className="Recognition">
        <div className="content">
          <div className="people"><img src={this.state.imagePreviewUrl} alt="People" /></div>
          <div className="recognitionData">
            <PersonData result={this.state.result} />
            <UploadButton id="recognitionUpload" value="Upload photo" onClick={this.fileUploadHandler}>
            </UploadButton>
            <button onClick={this.recognitionHandler}>
              Recognize
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function PersonData(props) {
  if(props.result == null) return (<div className="None"></div>);

  var faceIsDetected = <div>Лицо найдено: {props.result.faceIsFoundInImage.toString()}</div>;

  if (props.result.personData != null) {
    var name = null;
    var age = null;
    var externalId = null;

    name = <div>Кто на фотографии: {props.result.personData.lastName} {props.result.personData.firstName} {props.result.personData.middleName != null ? props.result.personData.middleName : ''}</div>;

    if (props.result.personData.age != null)
      age = <div>Возраст: {props.result.personData.age}</div>;

    if (props.result.personData.externalId != null)
      externalId = <div>Внешний айди: {props.result.personData.externalId}</div>;

    return (
      <div>
        {name}
        {age}
        {externalId}
      </div>
    );
  } else
    return (
      <div>
        {faceIsDetected}
        {props.result.faceIsFoundInImage ? <div>Данного человека в БД нет</div> : null}
      </div>
    );
}

export default Recognition;