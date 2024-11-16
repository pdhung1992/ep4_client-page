import {CHANGE_AVATAR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT} from "./actionTypes";

export const loginSuccess = (userData) => {
    return{
        type: LOGIN_SUCCESS,
        payload: {userData}
    };
}

export const loginFail = (message) => {
    return{
        type: LOGIN_FAIL,
        payload: message
    };
}

export const logout = () => {
    return{
        type: LOGOUT
    };
}

export const changeAvatar = (avatar) => {
    return{
        type: CHANGE_AVATAR,
        payload: {avatar : avatar}
    };
}

