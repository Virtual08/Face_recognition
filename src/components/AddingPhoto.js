import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class AddingPhoto extends Component {
    constructor(props) {
      super(props);
    };
  
    render() {
      return (
        <div className="AddingPhoto">
          <Button variant="contained" color="primary">
              AddingPhoto
          </Button>
        </div>
      );
    }
}

export default AddingPhoto;