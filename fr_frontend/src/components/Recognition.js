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
      var file = document.getElementById('recognitionUpload').files[0];

      this.setState({
        selectedFile: file,
        imagePreviewUrl: URL.createObjectURL(file),
        result: null
      });
    }

    // this.setState({
    //   selectedFile: event.target.files[0],
    //   imagePreviewUrl: URL.createObjectURL(event.target.files[0]),
    //   result: null
    // })
  }

  recognitionHandler = event => {
    var formData = new FormData();
    formData.append('file', this.state.selectedFile);

    console.log(this.state.selectedFile);
    console.log(formData.getAll('file'));

    fetch('http://localhost:8080/recognize', {
      method: 'POST',
      headers: {
          // 'Content-Type': 'multipart/form-data'
      },
      body: formData
    })
      .then(response => response.json())
      .then(result => {this.setState(result)});
  }

  render() {

    return (
      <div className="Recognition">
        <div className="content">
          <div className="people"><img src={this.state.imagePreviewUrl} alt="People" /></div>
          <div className="recognitionData">
            {this.state.result != null ?  
              <div>Лицо найдено: {this.state.result.faceIsFoundInImage.toString()} <br></br> Кто на фотографии: {this.state.result.personData.firstName}</div> :
             <div className="None"></div>}
            <UploadButton id="recognitionUpload" value="Upload photo" onClick={this.fileUploadHandler}>
            </UploadButton>
            <button variant="contained" color="primary" onClick={this.recognitionHandler}>
                Recognize
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Recognition;