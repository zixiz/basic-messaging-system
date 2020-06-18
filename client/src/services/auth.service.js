import axios from "axios";

const API_URL = "http://localhost:3000/auth/";

const login = (email, password) => {
    return axios.post(API_URL + "login", {
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
}
  
const logout = () => {
    localStorage.removeItem("user");
  };
  
const register = (email, password) => {
    return axios.post(API_URL + "register", {
        email,
        password
        });
} 
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  export default {
    register,
    login,
    logout,
    getCurrentUser,
  };
  
