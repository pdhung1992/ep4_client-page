import {CHANGE_AVATAR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT} from "../actions/actionTypes";

const initialState = {
    isLoggedIn : false,
    userData : null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type){
        case LOGIN_SUCCESS:
            return{
                ...state,
                isLoggedIn: true,
                userData: action.payload.userData
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userData: null
            }
        case CHANGE_AVATAR:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    avatar: action.payload.avatar,
                },
            };
        default:
            return state;
    }
}

export default authReducer;
