import React, { Component } from 'react';
import UploadButton from './UploadButton';
import InputText from './InputText';

class AddingPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      result: null
    }
  };

  fileUploadHandler = event => {
    document.getElementById('addingPhotoUpload').click();
    document.getElementById('addingPhotoUpload').onchange = () => {
      var file = document.getElementById('addingPhotoUpload').files[0];

      this.setState({
        selectedFile: file,
      });
    }

    // this.setState({
    //   selectedFile: event.target.files[0],
    //   imagePreviewUrl: URL.createObjectURL(event.target.files[0]),
    //   result: null
    // })
  }

  textUpdateHandler = event => {
    var name = event.target.name;
    var value = event.target.value;

    this.setState({
      [name]: value
    });
  }
    
  addPersonHandler = event => {
    var formData = new FormData();
    formData.append('file', this.state.selectedFile);
    formData.append('firstName', this.state.firstName);
    formData.append('lastName', this.state.lastName);
    formData.append('middleName', this.state.middleName);
    formData.append('age', this.state.age);
    formData.append('externalId', this.state.externalId);

    console.log(this.state.selectedFile);
    console.log(formData.getAll('file'));

    fetch('http://localhost:8080/addPerson', {
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
            <form>
              <div>
                <InputText value="First name" type="text"  name="firstName" onChange={this.textUpdateHandler}></InputText>
              </div>
              <div>
                <InputText value="Last name" type="text"  name="lastName" onChange={this.textUpdateHandler}></InputText>
              </div>
              <div>
                <InputText value="Middle name" type="text"  name="middleName" onChange={this.textUpdateHandler}></InputText>
              </div>
              <div>
                <InputText value="Age" type="text"  name="age" onChange={this.textUpdateHandler}></InputText>
              </div>
              <div>
                <InputText value="External id" type="text"  name="externalId" onChange={this.textUpdateHandler}></InputText>
              </div>
              <UploadButton id="addingPhotoUpload" value="Upload photo" onClick={this.fileUploadHandler}>
              </UploadButton>
              <button variant="contained" color="primary" onClick={this.addPersonHandler}>
                  Add person
              </button>
            </form>
            </div>
          </div>
        </div>
      );
    }
}

export default AddingPhoto;