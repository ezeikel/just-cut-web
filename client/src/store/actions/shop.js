import * as actionTypes from './actionTypes';

export const fetchShopsSuccess = (shops) => {
    return {
        type: actionTypes.FETCH_SHOPS_SUCCESS,
        shops
    }
};

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
    };
};

export const handleFormInputChange = (name, value) => {
    return {
        type: actionTypes.HANDLE_FORM_INPUT_CHANGE,
        name,
        value
    };
};

export const addShopSuccess = () => {
    return {
        type: actionTypes.ADD_SHOP_SUCCESS
    };
};

export const addShopFail = () => {
    return {
        type: actionTypes.ADD_SHOP_FAIL
    };
};

export const addShopStart = () => {
    return {
        type: actionTypes.ADD_SHOP_START
    };
};

export const addShop = (name, address) => {
    return async dispatch => {
        dispatch(addShopStart());
        
        await fetch('/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, address })
        });
        

        dispatch(addShopSuccess());
    };
};