import {GET_GENRES_API} from "../constants/constants";
import apiServices from "./api-service";


const getGenres = async () => {
    try {
        const url = GET_GENRES_API;
        const response = await apiServices.get(url);
        return response.data;
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

const genresServices = {
    getGenres,
}

export default genresServices;
