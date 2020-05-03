import React, { Component } from 'react';
import UploadButton from './UploadButton';
import InputText from './InputText';
import StickyHeadTable from './Table';
import OutputText from './OutputText';

class AddPerson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      people: [],
      error: null,
      firstName: '',
      lastName: '',
      middleName: '',
      age: '',
      externalId: ''
    }
    this.getPeople();
  };

  fileUploadHandler = event => {
    document.getElementById('uploadPhoto').click();
    document.getElementById('uploadPhoto').onchange = () => {
      var files = document.getElementById('uploadPhoto').files;

      if (files.length > 0) {
        this.setState({
          selectedFile: files[0],
        });
      }
    }
  };

  textUpdateHandler = event => {
    var name = event.target.name;
    var value = event.target.value;

    this.setState({
      [name]: value
    });
  };

  addPersonHandler = event => {
    if (this.state.selectedFile == null || this.state.firstName.length == 0 || this.state.lastName.length == 0) { this.setState({error: 3}); return; }

    var formData = new FormData();
    formData.append('file', this.state.selectedFile);
    formData.append('firstName', this.state.firstName);
    formData.append('lastName', this.state.lastName);

    if(this.state.middleName.length > 0)
      formData.append('middleName', this.state.middleName);
    if(this.state.age.length > 0)
      formData.append('age', this.state.age);
    if(this.state.externalId.length > 0)
      formData.append('externalId', this.state.externalId);

    fetch('http://localhost:8080/addPerson', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data'
      },
      body: formData
    })
      .then(response => response.json())
      .then(result => {
        this.setState({
          people: result.people,
          error: result.error,
          selectedFile: null,
          firstName: '',
          lastName: '',
          middleName: '',
          age: '',
          externalId: ''
        });
      });

    this.clearInputs()
    // this.getPeople();
  };

  clearInputs() {
    var inputs = document.getElementsByTagName('input');

    for(var i = 0; i < inputs.length; i++)
        inputs[i].value = '';
  }

  getPeople() {
    fetch("http://localhost:8080/getPeople")
      .then(response => response.json())
      .then(
        result => {
          this.setState({
            people: result
          });
        },
        error => {
          this.setState({
            error
          });
        }
      )
  };

  clickOnDeleteHandle = data => {
    fetch("http://localhost:8080/deletePerson/" + data.personId, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(
        result => {
          this.setState({
            people: result,
          });
        },
        error => {
          this.setState({
            error
          });
        }
      );
  };

  render() {
    var message;

    if(this.state.error == 1 || this.state.error == 2) 
      message = "Неудачное фото";

    if(this.state.error == 3) 
      message = "Фамилия, имя и фото обязательны";

    return (
      <div className="AddPerson">
          <div className="people">
            <StickyHeadTable data={this.state.people} onClick={this.clickOnDeleteHandle} />
          </div>
          <div className="newPersonData">
            <div className="personData">
              <InputText value="First name" type="text" name="firstName" onChange={this.textUpdateHandler}></InputText>
              <InputText value="Last name" type="text" name="lastName" onChange={this.textUpdateHandler}></InputText>
              <InputText value="Middle name" type="text" name="middleName" onChange={this.textUpdateHandler}></InputText>
              <InputText value="Age" type="text" name="age" onChange={this.textUpdateHandler}></InputText>
              <InputText value="External id" type="text" name="externalId" onChange={this.textUpdateHandler}></InputText>
              <OutputText label="Message" id="messageA" value={message}></OutputText>
            </div>
            <div className="addPersonButtons">
              <UploadButton className="addPersonBtn" id="uploadPhoto" value="Upload photo" onClick={this.fileUploadHandler}>
              </UploadButton>
              <div className="button addPersonBtn" onClick={this.addPersonHandler}>
                Add person
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default AddPerson;