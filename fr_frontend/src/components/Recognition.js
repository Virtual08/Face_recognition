import React, { Component } from 'react';
import people from '../images/photo.svg';
import UploadButton from './UploadButton';
import OutputText from './OutputText';

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

    fetch('http://localhost:8080/recognize', {
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
    var fullName;
    var externalId;
    var age;
    var message;

    if(this.state.result != null) {
      if (this.state.result.personData != null) {
        fullName = this.state.result.personData.lastName + " " + this.state.result.personData.firstName;

        if(this.state.result.personData.middleName != null)
          fullName += " " + this.state.result.personData.middleName;
    
        if (this.state.result.personData.age != null)
          age = this.state.result.personData.age;
    
        if (this.state.result.personData.externalId != null)
          externalId = this.state.result.personData.externalId;
      } else {
        message = this.state.result.faceIsFoundInImage ? "Данного человека в БД нет" : "Не удалось найти лицо";
      }
    }

    return (
      <div className="Recognition">
        <div className="loadedImage"><img src={this.state.imagePreviewUrl} alt="People" /></div>
        <div className="recognitionData">
          <div className="result">
            <OutputText label="Full name" id="fullName" value={fullName}></OutputText>
            <OutputText label="External id" id="externalId" value={externalId}></OutputText>
            <OutputText label="Age" id="age" value={age}></OutputText>
            <OutputText label="Message" id="message" value={message}></OutputText>
          </div>
          <div className="buttons">
            <UploadButton className="recognitionBtn" id="recognitionUpload" value="Upload photo" onClick={this.fileUploadHandler}>
            </UploadButton>
            <div className="button recognitionBtn" onClick={this.recognitionHandler}>
              Recognize
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Recognition;