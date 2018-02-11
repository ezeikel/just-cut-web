import * as actionTypes from './actionTypes';

export const fetchShopsSuccess = (shops) => (
  {
    type: actionTypes.FETCH_SHOPS_SUCCESS,
    shops
  }
);

export const fetchShopsFail = (error) => (
  {
    type: actionTypes.FETCH_SHOPS_FAIL,
    error
  }
);

export const fetchShopsStart = () => (
  {
    type: actionTypes.FETCH_SHOPS_START
  }
);

export const fetchShops = () => (
  async dispatch => {
    dispatch(fetchShopsStart());

    let fetchedShops = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '{ shops { id, name, slug, photo, location { coordinates, address } } books { author, title } }' })
    });
    fetchedShops = await fetchedShops.json();

    const { shops } = fetchedShops.data;

    dispatch(fetchShopsSuccess(shops));
  }
);
