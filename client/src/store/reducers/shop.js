import * as actionTypes from '../actions/actionTypes';

const initialState = {
    shops: [],
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_SHOPS_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.FETCH_SHOPS_SUCCESS:
            return {
                ...state,
                shops: action.shops,
                loading: false
            };
        case actionTypes.FETCH_SHOPS_FAIL:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}

export default reducer;