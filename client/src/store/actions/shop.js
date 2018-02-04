import * as actionTypes from './actionTypes';

export const fetchShopSuccess = (shop) => (
  {
    type: actionTypes.FETCH_SHOP_SUCCESS,
    shop
  }
);

export const fetchShopFail = (error) => (
  {
    type: actionTypes.FETCH_SHOP_FAIL,
    error
  }
);

export const fetchShopStart = () => (
  {
    type: actionTypes.FETCH_SHOP_START
  }
);

export const fetchShop = (slug) => (
  async dispatch => {
    dispatch(fetchShopStart());

    let fetchedShop = await fetch(`/shop/${slug}`);
    fetchedShop = await fetchedShop.json();

    dispatch(fetchShopSuccess(fetchedShop));
  }
);
