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
    var personData = <div className="None"></div>;

    if (this.state.result != null) {
      personData = <div>Лицо найдено: {this.state.result.faceIsFoundInImage.toString()}</div>;

      if (this.state.result.personData != null) {
        personData += <div>Кто на фотографии: {this.state.result.personData.lastName} {this.state.result.personData.firstName}</div>;

      //   if (this.state.result.personData.age != null)
      //     personData += <div>Возраст: {this.state.result.personData.age}</div>;

      //   if (this.state.result.personData.externalId != null)
      //     personData += <div>Внешний айди: {this.state.result.personData.externalId}</div>;
      } else{}
      //   personData += <div>Данного человека в БД нет</div>;
    }

    return (
      <div className="Recognition">
        <div className="content">
          <div className="people"><img src={this.state.imagePreviewUrl} alt="People" /></div>
          <div className="recognitionData">
            {personData}
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

export default Recognition;