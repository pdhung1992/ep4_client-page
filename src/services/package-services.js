import {GET_PACKAGES_FOR_PAYMENT} from "../constants/constants";
import apiServices from "./api-service";


const getPackagesForPayment = async () => {
    try {
        const url = `${GET_PACKAGES_FOR_PAYMENT}`;
        const res = await apiServices.get(url);
        return res.data;
    } catch (error) {
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
    getPackagesForPayment,
}

export default paymentServices;
