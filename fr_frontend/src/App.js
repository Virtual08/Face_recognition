import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';
import Recognition from './components/Recognition';
import AddingPhoto from './components/AddingPhoto';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import logo from './logo.svg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'main',
    }
  };

  loadAdding = () => {
    this.setState({page: 'adding'});
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <Menu />
          <Switch>
            <Route exact path="/" component={Recognition} />
            <Route path="/addingPhoto" component={AddingPhoto} />
          </Switch>
        </Router>
      </div>
    );
  };
}

class Menu extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div className="Menu">
        <Link to='/'>
          <Button variant="outlined" color="primary">
            Recognition
          </Button>
        </Link>
        <Link to='/addingPhoto'>
          <Button variant="outlined" color="primary">
            Adding photo
          </Button>
        </Link>
      </div>
    );
  }
}

function Logo(props) {
  return <Link to='/'><img className="logo" src={logo} alt="Logo" /></Link>;
}

function Exit(props) {
  return  (
    <IconButton aria-label="delete" disabled color="primary">
      <ExitToAppIcon color="primary" />
    </IconButton>
  );
}

function Key(props) {
  return (
    <IconButton aria-label="delete" disabled color="primary">
      <VpnKeyIcon color="primary" />
    </IconButton>
  );
}


class Header extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div className="Header">
        <Logo />
        <Key />
        <Exit />
      </div>
    );
  }
}

export default App;
