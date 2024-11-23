import {
    CHANGE_AVATAR_API,
    CHANGE_PASSWORD_API, FORGOT_PASSWORD_API,
    GET_NEW_AVATAR_API, GET_USER_INFO_API,
    REGISTER_API, RESET_PASSWORD_API,
    SIGN_IN_API
} from "../constants/constants";
import apiServices from "./api-service";


const register = async (formData) => {
    try {
        const url = REGISTER_API;
        const res = await apiServices.post(url, formData);
        return res.data;
    }catch (error){
        if (error.response) {
            return error.response.data;
        } else if (error.request) {
            return 'No response from server';
        } else {
            return 'An error occurred';
        }
    }
}

const login = async (formData) => {
    try {
        const url = SIGN_IN_API;
        const res = await apiServices.post(url, formData);
        return res.data;
    }catch (error){
        if (error.response) {
            return error.response.data;
        } else if (error.request) {
            return 'No response from server';
        } else {
            return 'An error occurred';
        }
    }
}

const logout = async () => {
    await sessionStorage.removeItem('user');
    const url = '/auth/user/logout';
    await apiServices.get(url);
    return true;
}

const getUserInfo = async (axiosConfig) => {
    try {
        const url = GET_USER_INFO_API;
        const res = await apiServices.get(url, axiosConfig);
        return res.data;
    }catch (error){
        if (error.response) {
            return error.response.data;
        } else if (error.request) {
            return 'No response from server';
        } else {
            return 'An error occurred';
        }
    }
}

const changePassword = async (formData, axiosConfig) => {
    try {
        const url = CHANGE_PASSWORD_API;
        const res = await apiServices.post(url, formData, axiosConfig);
        return res.data;
    }catch (error){
        if (error.response) {
            return error.response.data;
        } else if (error.request) {
            return 'No response from server';
        } else {
            return 'An error occurred';
        }
    }
}

const changeAvatar = async (formData, axiosConfig) => {
    try {
        const url = CHANGE_AVATAR_API;
        const res = await apiServices.post(url, formData, axiosConfig);
        return res.data;
    }catch (error){
        if (error.response) {
            return error.response.data;
        } else if (error.request) {
            return 'No response from server';
        } else {
            return 'An error occurred';
        }
    }
}

const getNewAvatar = async (axiosConfig) => {
    try {
        const url = GET_NEW_AVATAR_API;
        const res = await apiServices.get(url, axiosConfig);
        return res.data;
    }catch (error){
        if (error.response) {
            return error.response.data;
        } else if (error.request) {
            return 'No response from server';
        } else {
            return 'An error occurred';
        }
    }
}

const forgotPassword = async (formData) => {
    try {
        const url = FORGOT_PASSWORD_API;
        const res = await apiServices.post(url, formData);
        return res.data;
    }catch (error){
        if (error.response) {
            return error.response.data;
        } else if (error.request) {
            return 'No response from server';
        } else {
            return 'An error occurred';
        }
    }
}

const resetPassword = async (formData) => {
    try {
        const url = RESET_PASSWORD_API;
        const res = await apiServices.post(url, formData);
        return res.data;
    }catch (error){
        if (error.response) {
            return error.response.data;
        } else if (error.request) {
            return 'No response from server';
        } else {
            return 'An error occurred';
        }
    }
}

const authServices = {
    register,
    login,
    logout,
    changePassword,
    changeAvatar,
    getNewAvatar,
    forgotPassword,
    resetPassword,
    getUserInfo
}

export default authServices;
