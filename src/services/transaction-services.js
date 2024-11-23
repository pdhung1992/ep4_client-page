import apiServices from "./api-service";
import {GET_USER_TRANSACTIONS_API} from "../constants/constants";


const getUserTransactions = async (pageNo, axiosConfig) => {
    try {
        const url = `${GET_USER_TRANSACTIONS_API}?pageNo=${pageNo}`;
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

const transactionServices = {
    getUserTransactions,
}

export default transactionServices;
