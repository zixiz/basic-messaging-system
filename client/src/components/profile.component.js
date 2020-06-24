import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import userService from "../services/user.service"
import { BsX } from "react-icons/bs";

const Profile = (props) => {

const [currentUser, setCurrentUser] = useState({});
const [recivedMesages, setrecivedMesages] = useState([]);
const [sentMesages, setsentMesages] = useState([]);
const [loading, setLoading] = useState(false);
const [isSent, setisSent] = useState(false);
const [messageForDelete, setmessageForDelete] = useState("");
const [noDataToShow,setNoDataToShow] = useState(false);

    const isMessagesEmpty = (arr) =>{
        return  (arr.length === 0) ? setNoDataToShow(true) : setNoDataToShow(false);
    }

    useEffect(() => {
        setLoading(true);
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
        if(isSent){
            userService.getAllSentMessages().then(response =>{
                setsentMesages(response.data.response);
                setLoading(false);
                isMessagesEmpty(response.data.response)
            });
        }else{           
            userService.getAllRecivedMessages().then(response =>{
                setrecivedMesages(response.data.response);
                setLoading(false);
                isMessagesEmpty(response.data.response);
            });
        }        
    }, [isSent]);

    const  deleteMessage = async () =>{
        if(isSent){
            let response = await userService.deleteMessage(messageForDelete);
            let newsentMesages = await userService.getAllSentMessages();
            setsentMesages(newsentMesages.data.response);
            isMessagesEmpty(newsentMesages.data.response);
            setLoading(false);
            setmessageForDelete("");
        }else{
            let response = await userService.deleteMessage(messageForDelete);
            let newsentMesages = await userService.getAllRecivedMessages();
            setrecivedMesages(newsentMesages.data.response);
            isMessagesEmpty(newsentMesages.data.response);
            setLoading(false);
            setmessageForDelete("");
        }
    }

    const  sendToComposeMessage = () =>{
        props.history.push("/compose");
        window.location.reload();
    }
  

  return (
    <div className="container">
        <div className="row">
            <div className="col-sm-3">
            <strong>Hello {currentUser.full_name}</strong>
            <label className="switch switch-yes-no">
                <input onClick={()=>setisSent(!isSent)} className="switch-input" type="checkbox" />
                <span className="switch-label" data-on="Sent" data-off="Inbox"></span> 
                <span className="switch-handle"></span> 
            </label>
            </div>
            <div className="col-sm-9">
            {noDataToShow ? 
                (
                    <div className="card text-center">
                        {isSent ? (
                        <div className="card-body">
                        <h5 className="card-title">
                            There aren't any sent messages yet.
                        </h5>
                        <button className="btn btn-primary" onClick={sendToComposeMessage}>Compose Message</button>
                        </div>
                        ):(
                        <div className="card-body">
                        <h5 className="card-title">
                            There are no messages yet.
                        </h5>
                        </div>
                        )}
                    </div>
                ) : (
                <table className="table">
                <thead className="thead-dark">
                    <tr>
                        {isSent ? (<th scope="col">Sender</th>) : (<th scope="col">From</th>)}
                        <th scope="col">Subject</th>
                        <th scope="col">Message</th>
                    </tr>
                </thead>
                    {isSent ? (
                            <tbody>
                                {sentMesages.map((data)=>  
                                <tr key={data.id.toString()}>
                                <th>{data.user.email}</th>
                                <td>{data.subject}</td>
                                <td className="d-flex justify-content-between">
                                    {data.message} <BsX onClick={()=>setmessageForDelete(data.id.toString())} data-toggle="modal" data-target="#deleteMessagePrompt"/>
                                </td>               

                                </tr>
                                )}
                            </tbody>
                        ) : (
                            <tbody>
                                {recivedMesages.map((data)=>  
                                <tr key={data.id.toString()}>
                                <th>{data.user.email}</th>
                                <td>{data.subject}</td>
                                <td className="d-flex justify-content-between">
                                    {data.message} <BsX onClick={()=>setmessageForDelete(data.id.toString())} data-toggle="modal" data-target="#deleteMessagePrompt"/>
                                </td>
                                </tr>
                                )}
                            </tbody>
                        )}              
            </table>
            )}
                
        </div>
        </div>
        <div className="modal fade" id="deleteMessagePrompt" tabIndex="-1" role="dialog" aria-labelledby="deleteMessagePromptLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Are you sure you want to DELETE?</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                This will delete the message for both the sender and reciver.
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={deleteMessage}>Delete</button>
            </div>
            </div>
            </div>
        </div>  
    </div>
  );
};



export default Profile;