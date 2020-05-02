import React, { Component } from 'react';
import UploadButton from './UploadButton';
import InputText from './InputText';
import StickyHeadTable from './Table';

class AddPerson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      people: []
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
    var formData = new FormData();
    formData.append('file', this.state.selectedFile);
    formData.append('firstName', this.state.firstName);
    formData.append('lastName', this.state.lastName);
    formData.append('middleName', this.state.middleName);
    formData.append('age', this.state.age);
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
          people: result
        });
      });

    this.getPeople();
  };

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
    return (
      <div className="AddPerson">
        <div className="content">
          <div className="people">
            <StickyHeadTable data={this.state.people} onClick={this.clickOnDeleteHandle} />
          </div>
          <div className="recognitionData" onClick={this.loadDataAboutPeople}>
            <div>
              <InputText value="First name" type="text" name="firstName" onChange={this.textUpdateHandler}></InputText>
            </div>
            <div>
              <InputText value="Last name" type="text" name="lastName" onChange={this.textUpdateHandler}></InputText>
            </div>
            <div>
              <InputText value="Middle name" type="text" name="middleName" onChange={this.textUpdateHandler}></InputText>
            </div>
            <div>
              <InputText value="Age" type="text" name="age" onChange={this.textUpdateHandler}></InputText>
            </div>
            <div>
              <InputText value="External id" type="text" name="externalId" onChange={this.textUpdateHandler}></InputText>
            </div>
            <UploadButton id="uploadPhoto" value="Upload photo" onClick={this.fileUploadHandler}>
            </UploadButton>
            <button onClick={this.addPersonHandler}>
              Add person
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddPerson;