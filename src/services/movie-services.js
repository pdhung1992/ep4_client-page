import {
    CHECK_USER_RIGHTS_API, CREATE_VNPAY_PAYMENT, GET_HOME_MOVIE_BY_CATEGORY_API, GET_MOVIE_BY_CATEGORY_API,
    GET_SHOW_AT_HOME_MOVIES_API, MOVIE_BEST_MOVIES_BY_GENRE_API,
    MOVIE_DETAIL,
    MOVIE_DETAIL_API, MOVIE_DETAIL_RELATED_API,
    VIDEO_URL
} from "../constants/constants";
import apiServices from "./api-service";


const getShowAtHomeMovies = async () => {
    try {
        const url = GET_SHOW_AT_HOME_MOVIES_API;
        const res = await apiServices.get(url);
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

const getHomeMovieByCategory = async (category) => {
    try {
        const url = `${GET_HOME_MOVIE_BY_CATEGORY_API}${category}`;
        const res = await apiServices.get(url);
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

const getMovieDetail = async (slug, userId) => {
    try {
        const url = `${MOVIE_DETAIL_API}${slug}/${userId}`;
        console.log(url);
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

const getMovieDetailsRelated = async (id) => {
    try {
        const url = `${MOVIE_DETAIL_RELATED_API}${id}`;
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

const checkUserRights = async (id, axiosConfig) => {
    try {
        const url = `${CHECK_USER_RIGHTS_API}${id}`;
        const res = await apiServices.get(url, axiosConfig);
        return res;
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

const watchMovie = async (fileName, axiosConfig) => {
    try {
        const url = `${VIDEO_URL}${fileName}`;
        const res = await apiServices.get(url, axiosConfig);
        return res;
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

const getBestMoviesByGenre = async (slug) => {
    try {
        const url = `${MOVIE_BEST_MOVIES_BY_GENRE_API}${slug}`;
        const res = await apiServices.get(url);
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

const movieServices = {
    getShowAtHomeMovies,
    getHomeMovieByCategory,
    getMovieDetail,
    getMovieDetailsRelated,
    checkUserRights,
    watchMovie,
    getBestMoviesByGenre,
}

export default movieServices;
