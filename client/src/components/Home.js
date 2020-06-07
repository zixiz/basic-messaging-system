import React, { Component } from 'react';
import { Button, Form} from 'react-bootstrap';
import {connect} from "react-redux";
import {loginAction} from '../store/actions/actions'

class Home extends Component {
    
    render() {
      return (
        <div>ZUBIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII</div>
      );
    }
  }
  
  const mapStateToProps = state => {
    // return {message:state.message};
};

const  mapDispatchToProps = dispatch => {
    return  {
        loginAction: function(input) {
            return  dispatch(loginAction(input));
        }
    }
};



const home = connect(mapStateToProps, mapDispatchToProps)(Home);

export default home;