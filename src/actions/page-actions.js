import {CURRENT_PAGE} from "./actionTypes";


export const updateCurrentPage = (currentPage) => ({
    type: CURRENT_PAGE,
    payload: currentPage
})
