const initialState ={}

const MailReducer = (state = initialState, action) => {
    let newState={};
        switch(action.type) {
            case "LOGIN":
                newState = Object.assign({}, state, {
                    isLoggedIn:action.data.isLoggedIn
                });
                return newState;

                case "LOGIN_FAIL":
                newState = Object.assign({}, state, {
                    loginError:action.data.error,
                    isLoggedIn:action.data.success
                });
                return newState;

                case "SESSION_SUCCESS":
                newState = Object.assign({}, state, {
                    isLoggedIn:true
                });
                return newState;

                case "SESSION_FAILED":
                newState = Object.assign({}, state, {
                    isLoggedIn:false
                });
                return newState;
        }

}

export default MailReducer;