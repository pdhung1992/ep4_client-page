import {CURRENT_PAGE} from "../actions/actionTypes";


const initState = {
    currentPage: ''
}

const pageReducer = (state = initState, action) => {
    switch (action.type) {
        case CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            };
        default:
            return state;
    }
}

export default pageReducer;
