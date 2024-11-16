import {CREATE_VNPAY_PAYMENT, VNPAY_PAYMENT_IPN} from "../constants/constants";
import apiServices from "./api-service";


const createPayment = async (formData, axiosConfig) => {
    try {
        const url = CREATE_VNPAY_PAYMENT;
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

const handleIpn = async (params, axiosConfig) => {
    try {
        const url = VNPAY_PAYMENT_IPN;

        const queryParams = params instanceof URLSearchParams ? params.toString() : params;

        const res = await apiServices.get(url+'?'+queryParams, axiosConfig);
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

const paymentServices = {
    createPayment,
    handleIpn
}

export default paymentServices;

