import {CREATE_REVIEW_API, GET_MOVIE_REVIEWS_API, GET_REVIEW_BY_PARENT_ID_API} from "../constants/constants";
import apiServices from "./api-service";


const createReview = async (formData, axiosConfig) => {
    try {
        const url = `${CREATE_REVIEW_API}`;
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

const getMovieReviews = async (slug) => {
    try {
        const url = `${GET_MOVIE_REVIEWS_API}${slug}`;
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

const getReviewByParentId = async (parentId) => {
    try {
        const url = `${GET_REVIEW_BY_PARENT_ID_API}${parentId}`;
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

const reviewService = {
    createReview,
    getMovieReviews,
    getReviewByParentId
}

export default reviewService;
