import React, { Component } from 'react';
import { Button, Form} from 'react-bootstrap';
import {connect} from "react-redux";
import {loginAction} from '../store/actions/actions'

class Login extends Component {
    state = {
        email:"",
        password:"",
        massage:''
    }

    onChangeText(ev)
    {
        this.setState({ [ev.target.name]:ev.target.value});
    }


    handleLogin(e){
        e.preventDefault();
        let preparUser = {email:this.state.email,
        password:this.state.password};
        
        this.props.loginAction(preparUser);
    }

    render() {
      return (
        <Form onSubmit={this.handleLogin.bind(this)}>
            <h3>Login</h3>
    
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" onChange={this.onChangeText.bind(this)} placeholder="Enter email" />
            </Form.Group>
          
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" onChange={this.onChangeText.bind(this)} placeholder="Password" />
            </Form.Group>
            <Button variant="primary" onClick={this.handleLogin.bind(this)}>
              Submit
            </Button>
          </Form>
      );
    }
  }
  
//   const mapStateToProps = state => {
//     // return {message:state.message};
// };

const  mapDispatchToProps = dispatch => {
    return  {
        loginAction: function(input) {
            return  dispatch(loginAction(input));
        }
    }
};



const login = connect(null, mapDispatchToProps)(Login);

export default login;