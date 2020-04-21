import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class AddingPhoto extends Component {
    constructor(props) {
      super(props);
    };
    
  fileUploadHandler = event => {
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
        <div className="AddingPhoto">
          <div className="content">
            <div className="people"></div>
            <div className="recognitionData">
              {/* {this.state.result != null ?  
                <div>Лицо найдено: {this.state.result.faceIsFoundInImage.toString()} <br></br> Кто на фотографии: {this.state.result.is_picture_of.toString()}</div> :
              <div className="None"></div>} */}
              <input
                accept="image/*"
                className="Test"
                id="contained-button-file"
                type="file"
                // onChange={this.fileSelectedHandler}
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                  Add photo
                </Button>
              </label>
              <Button variant="contained" color="primary" onClick={this.fileUploadHandler}>
                  Add person
              </Button>
            </div>
          </div>
        </div>
      );
    }
}

export default AddingPhoto;