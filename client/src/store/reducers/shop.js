import * as actionTypes from '../actions/actionTypes';

const initialState = {
    shops: [],
    loading: false,
    name: '',
    location: {
        address: '',
        coordinates: [0,0]
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_SHOPS_START:
            return {
                ...state,
                location: {
                    ...state.location.address,
                    ...state.location.coordinates
                },
                loading: true
            };
        case actionTypes.FETCH_SHOPS_SUCCESS:
            return {
                ...state,
                location: {
                    ...state.location.address,
                    ...state.location.coordinates
                },
                shops: action.shops,
                loading: false
            };
        case actionTypes.FETCH_SHOPS_FAIL:
            return {
                ...state,
                location: {
                    ...state.location.address,
                    ...state.location.coordinates
                },
                loading: false
            };
        case actionTypes.HANDLE_FORM_INPUT_CHANGE:
            return {
                ...state,
                location: {
                    ...state.location.address,
                    ...state.location.coordinates
                },
                [action.name]: action.value
            };
        case actionTypes.ADD_SHOP_START:
            return {
                ...state,
                location: {
                    ...state.location.address,
                    ...state.location.coordinates
                },
                loading: true
            };
        case actionTypes.ADD_SHOP_SUCCESS:
            return {
                ...state,
                location: {
                    address: '',
                    coordinates: [0,0]
                },
                name: '',
                address: '',
                loading: false
            };
        case actionTypes.ADD_SHOP_FAIL:
            return {
                ...state,
                location: {
                    ...state.location.address,
                    ...state.location.coordinates
                },
                loading: false
            };
        default:
            return state;
    }
}

export default reducer;