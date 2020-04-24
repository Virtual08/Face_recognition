import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';
import Recognition from './components/Recognition';
import AddPerson from './components/AddPerson';
import logo from './logo.svg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'main',
    }
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <Menu />
          <Switch>
            <Route exact path="/" component={Recognition} />
            <Route path="/addPerson" component={AddPerson} />
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
          <button>
            Recognition
          </button>
        </Link>
        <Link to='/addPerson'>
          <button>
            Adding photo
          </button>
        </Link>
      </div>
    );
  }
}

function Logo(props) {
  return <Link to='/'><img className="logo" src={logo} alt="Logo" /></Link>;
}

function Exit(props) {
  return  '';/*(
    <IconButton aria-label="delete" disabled color="primary">
      <ExitToAppIcon color="primary" />
    </IconButton>
  );*/
}

function Key(props) {
  return '';/*(
    <IconButton aria-label="delete" disabled color="primary">
      <VpnKeyIcon color="primary" />
    </IconButton>
  );*/
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
