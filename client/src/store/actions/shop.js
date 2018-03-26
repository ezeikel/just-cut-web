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
      query: `{ getShopBySlug(slug: "${slug}") { name, slug, location { coordinates, address }, photo, ratings } }`
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

export const updateRating = (rating) => (
  {
    type: actionTypes.UPDATE_RATING,
    rating
  }
);

export const addRatingStart = () => (
  {
    type: actionTypes.ADD_RATING_START
  }
);

export const addRatingSuccess = () => (
  {
    type: actionTypes.ADD_RATING_SUCCESS
  }
);

export const addRatingFail = () => (
  {
    type: actionTypes.ADD_RATING_FAIL
  }
);

export const addRating = (rating) => (
  async dispatch => {
    dispatch(addRatingStart());

    const query = {
      query: `mutation {addRating(rating: "${rating}") {id, name}}`
    };

    await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query)
    });

    dispatch(fetchShopSuccess());
  }
);
