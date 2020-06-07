import React, { Component } from 'react';
import './App.css';
import { Container ,Col,Row} from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {connect} from "react-redux";

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home'
import {CheckSession} from './store/actions/actions'


class App extends Component {
  
  componentDidMount(){

  }

  render() {
    // console.log("this.props.isLoggedIn" + " " + this.props.isLoggedIn)
    if(this.props.isLoggedIn){
      return (
        <Router>
          <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">      
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/"} className="nav-link">
                      Login
                    </Link>
                  </li>
    
                  <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                      Sign Up
                    </Link>
                  </li>
                </div>
            </nav>
          </div>
    
              <Switch>
                {/* <Route exact path={"/home"} component={Home} /> */}
                <Route exact path="/" component={Home} />
              </Switch>
        </Router>
      );
    }else{
      return (
        <Router>
          <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">      
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/"} className="nav-link">
                      Login
                    </Link>
                  </li>
    
                  <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                      Sign Up
                    </Link>
                  </li>
                </div>
            </nav>
          </div>
    
          <Switch>
                {/* <Route exact path={"/home"} component={Home} /> */}
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Register} />
              </Switch>
        </Router>
        
        
      );
    }
    
  }
}

const mapStateToProps = state => {
  return {isLoggedIn:state.isLoggedIn};
};


const  mapDispatchToProps = dispatch => {
  return  {
      CheckSession: function() {
          return  dispatch(CheckSession());
      }
  }
};

const app = connect(mapStateToProps,mapDispatchToProps)(App);

export default App;
