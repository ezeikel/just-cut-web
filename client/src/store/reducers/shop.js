import * as actionTypes from '../actions/actionTypes';

const initialState = {
    shops: [],
    loading: false,
    name: '',
    address: ''
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
        case actionTypes.ADD_SHOP_NAME_CHANGED:
            return {
                ...state,
                name: action.name
            };
        case actionTypes.ADD_SHOP_ADDRESS_CHANGED:
            return {
                ...state,
                address: action.address
            };
        case actionTypes.ADD_SHOP_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.ADD_SHOP_SUCCESS:
            return {
                ...state,
                name: '',
                address: '',
                loading: false
            };
        case actionTypes.ADD_SHOP_FAIL:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}

export default reducer;