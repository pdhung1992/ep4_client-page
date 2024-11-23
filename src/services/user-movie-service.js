import {GET_USER_MOVIES_API} from "../constants/constants";
import apiServices from "./api-service";


const getUserMovies = async (pageNo, search, axiosConfig) => {
    try {
        const url = `${GET_USER_MOVIES_API}?pageNo=${pageNo}&search=${search}`;
        const res = await apiServices.get(url, axiosConfig);
        return res.data;
    }catch (error) {
        if (error.response) {
            return error.response.data;
        } else if (error.request) {
            return 'No response from server';
        } else {
            return 'An error occurred';
        }
    }
}

const userMovieService = {
    getUserMovies
}

export default userMovieService;
