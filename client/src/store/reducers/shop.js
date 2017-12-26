import * as actionTypes from '../actions/actionTypes';
import { debug } from 'util';

const initialState = {
    shops: [],
    loading: false,
    name: '',
    location: {
        address: '',
        coordinates: {
            lng: 0,
            lat: 0
        }
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_SHOPS_START:
            return {
                ...state,
                location: {
                    ...state.location,
                    coordinates: {...state.location.coordinates}
                },
                loading: true
            };
        case actionTypes.FETCH_SHOPS_SUCCESS:
            return {
                ...state,
                location: {
                    ...state.location,
                    coordinates: { ...state.location.coordinates }
                },
                shops: action.shops,
                loading: false
            };
        case actionTypes.FETCH_SHOPS_FAIL:
            return {
                ...state,
                location: {
                    ...state.location,
                    coordinates: { ...state.location.coordinates }
                },
                loading: false
            };
        case actionTypes.HANDLE_FORM_INPUT_CHANGE:
            return {
                ...state,
                location: {
                    ...state.location,
                    coordinates: {...state.location.coordinates}
                },
                [action.name]: action.value
            };
        case actionTypes.HANDLE_FORM_INPUT_ADDRESS_CHANGE:
            return {
                ...state,
                location: {
                    ...state.location,
                    address: action.value,
                    coordinates: {...state.location.coordinates}
                },
            };
        case actionTypes.HANDLE_FORM_INPUT_ADDRESS_COORDINATES_CHANGE:
            return {
                ...state,
                location: {
                    ...state.location,
                    coordinates: {
                        ...state.location.coordinates,
                        [action.name]: action.value
                    } //TODO: Needs work
                },
            };
        case actionTypes.ADD_SHOP_START:
            return {
                ...state,
                location: {
                    ...state.location.address,
                    coordinates: {
                        ...state.location.coordinates
                    }
                },
                loading: true
            };
        case actionTypes.ADD_SHOP_SUCCESS:
            return {
                ...state,
                location: {
                    address: '',
                    coordinates: {
                        lng: 0,
                        lat: 0
                    }
                },
                name: '',
                loading: false
            };
        case actionTypes.ADD_SHOP_FAIL:
            return {
                ...state,
                location: {
                    ...state.location,
                    coordinates: { ...state.location.coordinates }
                },
                loading: false
            };
        default:
            return state;
    }
}

export default reducer;