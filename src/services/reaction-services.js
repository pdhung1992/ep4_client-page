import {REACTION_API} from "../constants/constants";
import apiServices from "./api-service";


const clickReaction = async (formData, axiosConfig) => {
    try {
        const url = `${REACTION_API}`;
        const res = await apiServices.post(url, formData, axiosConfig);
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

const reactionService = {
    clickReaction
}

export default reactionService;
