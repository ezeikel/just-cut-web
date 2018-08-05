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

    const query = {
      query: `{ getShopBySlug(slug: "${slug}") { _id, name, slug, location { coordinates, address }, photo, ratings } }`
    };

    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query)
    });

    const json = await response.json();
    const shop = json.data.getShopBySlug;

    dispatch(fetchShopSuccess(shop));
  }
);

export const setRatingStart = () => (
  {
    type: actionTypes.SET_RATING_START
  }
);

export const setRatingSuccess = () => (
  {
    type: actionTypes.SET_RATING_SUCCESS
  }
);

export const setRatingFail = () => (
  {
    type: actionTypes.SET_RATING_FAIL
  }
);

export const setRating = (id, rating) => (
  async dispatch => {
    dispatch(setRatingStart());

    const query = {
      query: `mutation {setRating(_id: "${id}", rating: ${rating}) {_id, name, ratings}}`
    };

    await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query)
    });

    dispatch(setRatingSuccess());
  }
);
