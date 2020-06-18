import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/messages/';

const getAllRecivedMessages = () => {
    return axios.get(API_URL + 'message/', { headers: authHeader()});
}
  
const getAllSentMessages = () => {
    return axios.get(API_URL + 'message/?filter=sent', { headers: authHeader()});
}

const getAllUsers = () => {
    return axios.get(API_URL + 'users/', { headers: authHeader()});
}
  
const composeMessage = (sender,reciver,message,subject) => {
    return axios.post(API_URL + 'message/',{
        sender: sender,
        reciver: reciver,
        message: message,
        subject: subject
        }, { headers: authHeader()});
}
  
const deleteMessage = (id) => {
    return axios.delete(API_URL + `message/${id}`, { headers: authHeader()});
}

export default {
    getAllRecivedMessages,
    getAllSentMessages,
    getAllUsers,
    composeMessage,
    deleteMessage
}

  
