import React, { useState, useEffect, useRef } from "react";
import userService from "../services/user.service"
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Textarea from 'react-validation/build/textarea';
import CheckButton from "react-validation/build/button";
import Select from "react-validation/build/select";
import AuthService from "../services/auth.service";


const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

async function delay(ms) {
  return await new Promise(resolve => setTimeout(resolve, ms));
}

const Compose = () => {
  const form = useRef();
  const checkBtn = useRef();
  const [allUsers, setallUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [emailMessage, setemailMessage] = useState("");
  const [sendTo, setsendTo] = useState(undefined);
  const [subject,setSubject] = useState("");
  const [user,setUser] = useState({})
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");



  useEffect(()=>{
    
    async function getAllUsersAndMine() {
      const user = await AuthService.getCurrentUser();
      setUser(user);
      let Users = await userService.getAllUsers();
      setallUsers(Users.data.response);
    }

    getAllUsersAndMine()


  },[]);

  const handleSendToChange = (e) => {
    const sendTo = e.target.value;
    setsendTo(sendTo);
    console.log(sendTo);
  };

  const handleSubjectChange = (e) => {
    const subject = e.target.value;
    setSubject(subject);
  }; 

  const handleMessageChange = (e) => {
    const value = e.target.value;
    setemailMessage(value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      try{
        let data = {sender:parseInt(user.id),reciver:parseInt(sendTo),message:emailMessage,subject:subject}
        let response = await userService.composeMessage(data);
        if(response.data.success){
          setMessage("The Message sent Successfuly");
          setLoading(false);
          setSuccessful(true);
          await delay(3000);
          setSuccessful(false);
          setMessage("");
          setsendTo(undefined);
          setSubject("");
          setemailMessage("");
        }else{
          setMessage(response.data.error);
          setSuccessful(false);
        }
      }catch(error){
        const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          
          setSuccessful(false);
          setMessage(resMessage);
          setLoading(false);
      }
      
  }else{
    setLoading(false);
  }
}

  return (
    <div className="container">
        <div className="row">
            
        </div>
        <div className="row">

        <Form ref={form} onSubmit={handleSendMessage} className="col-md-6 offset-md-3">
          <div className="form-group">
            <label htmlFor="inputAddress">From</label>
            <Input disabled type="text" value={user.email} className="form-control"/>
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress2">To</label>
            <Select value={sendTo} name="sendTo" onChange={handleSendToChange} className="form-control" validations={[required]}>
                <option value> -- select an option -- </option>
                {allUsers.map((user)=>
                  <option key={user.id} value={user.id}>{user.email}</option>
                )}
            </Select>
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress">Subject</label>
            <Input type="text" value={subject} name="subject" onChange={handleSubjectChange} className="form-control" validations={[required]}/>
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress">Message</label>
            <Textarea type="text" value={emailMessage} name="emailMessage" onChange={handleMessageChange} className="form-control" validations={[required]}/>
          </div>
          <div className="form-group">
          <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Send Message</span>
            </button>
          </div>
          {message && (
            <div className="form-group">
              <div
                className={ successful ? "alert alert-success" : "alert alert-danger" }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
        </div>
        
    </div>
  );
};

export default Compose;