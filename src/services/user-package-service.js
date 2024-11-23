import {GET_USER_PACKAGES_API} from "../constants/constants";
import apiServices from "./api-service";


const getUserPackages = async (axiosConfig) => {
    try {
        const url = `${GET_USER_PACKAGES_API}`;
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

const userPackageServices = {
    getUserPackages,
}

export default userPackageServices;
