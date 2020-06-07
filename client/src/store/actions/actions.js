export const loginAction = (input) =>{
    return async function (dispatch) {
        let response = await await fetch('http://localhost:3000/auth/login',{method: 'POST',headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },body: JSON.stringify(input)});

        let data = await response.json();
        console.log(data)

        if(data.success && data.token){
            localStorage.setItem("user", JSON.stringify(data.token));
            dispatch({type: "LOGIN",data: data});
        } else{
            dispatch({type: "LOGIN_FAIL",data: data});
        }

    }
}

export const CheckSession = () =>{
    return async function (dispatch) {
        console.log("im here")
        let userToken = JSON.parse(localStorage.getItem("user"));
        if(userToken){
            dispatch({type: "SESSION_SUCCESS",data: userToken})
        }else{
            dispatch({type: "SESSION_FAILED",data: null})
        }

    }
}