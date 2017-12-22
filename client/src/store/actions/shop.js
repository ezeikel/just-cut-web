import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchShopsSuccess = (shops) => {
    return {
        type: actionTypes.FETCH_SHOPS_SUCCESS,
        shops
    }
}

export const fetchShopsFail = (error) => {
    return {
        type: actionTypes.FETCH_SHOPS_FAIL,
        error
    };
};

export const fetchShopsStart = () => {
    return {
        type: actionTypes.FETCH_SHOPS_START
    };
};

export const fetchShops = () => {
    return async dispatch => {
        dispatch(fetchShopsStart());
        let fetchedShops = await fetch('/shops');
        fetchedShops = await fetchedShops.json();
        dispatch(fetchShopsSuccess(fetchedShops));
    }
}