import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";

import userService from "../services/user.service"

const Profile = () => {
const [currentUser, setCurrentUser] = useState({});
const [recivedMesages, setrecivedMesages] = useState([]);
const [sentMesages, setsentMesages] = useState([]);
const [loading, setLoading] = useState(false);
const [isSent, setisSent] = useState(false);


  useEffect(() => {
    setLoading(true);
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    userService.getAllRecivedMessages().then(response =>{
        setrecivedMesages(response.data.response)
        console.log(response.data.response)
        setLoading(false)
    })
  }, []);

  return (
    <div className="container">
        <div className="row">
            <div className="col-sm-3">
            {isSent ? (
                <h5>Show Sent Messages</h5>
            ) : (
                <h5>Show Recived Messages</h5>
            )}
            <input type="checkbox"  onClick={()=>setisSent(!isSent)}/>
            </div>
            <div className="col-sm-9">
            <table className="table">
        <thead className="thead-dark">
            <tr>
            <th scope="col">Sender</th>
            <th scope="col">Subject</th>
            <th scope="col">Message</th>
            </tr>
        </thead>
        <tbody>
        {isSent ? (
                <h5>Show Sent Messages</h5>
            ) : (
                <div>
                    {recivedMesages.map((data)=>  
                    <tr>
                    <th>{data.user.email}</th>
                    <td>{data.subject}</td>
                    <td>{data.message}</td>
                    </tr>
                    )}
                </div>
            )}
            
            
        </tbody>
        </table>
            </div>
        </div>
        
        
    </div>
  );
};

export default Profile;