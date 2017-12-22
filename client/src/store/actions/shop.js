import * as actionTypes from './actionTypes';

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

export const addShopNameChanged = (name) => {
    console.log('NAME IN ACITION: ', name);
    return {
        type: actionTypes.ADD_SHOP_NAME_CHANGED,
        name
    }
}

export const addShopAddressChanged = (address) => {
    return {
        type: actionTypes.ADD_SHOP_ADDRESS_CHANGED,
        address
    }
}