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

    const query = {
      query: '{ shops { id, name, slug, photo, location { coordinates, address }, tags, ratings } }'
    };

    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query)
    });
    const json = await response.json();

    const { shops } = json.data;

    dispatch(fetchShopsSuccess(shops));
  }
);
