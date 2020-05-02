import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';
import Recognition from './components/Recognition';
import AddPerson from './components/AddPerson';
import logo from './images/logo.svg';

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
          <Menu />
          <div className="content">
            <Switch>
              <Route exact path="/" component={Recognition} />
              <Route path="/addPerson" component={AddPerson} />
            </Switch>
          </div>
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
        <div className="logo">
          <Logo />
          <div className="logoName">
            Face recognition
          </div>
        </div>
        <Link to='/'>
          <div className="menuButton">
            Recognition
          </div>
        </Link>
        <Link to='/addPerson'>
          <div className="menuButton">
            Adding photo
          </div>
        </Link>
      </div>
    );
  }
}

function Logo(props) {
  return <Link to='/'><img className="logoImg" src={logo} alt="Logo" /></Link>;
}

export default App;
