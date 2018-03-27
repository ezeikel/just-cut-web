import * as actionTypes from '../actions/actionTypes';

const initialState = {
  shop: {
    location: {
      coordinates: [0, 0]
    }
  },
  rating: 0,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SHOP_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.FETCH_SHOP_SUCCESS:
      return {
        ...state,
        shop: action.shop,
        loading: false
      };
    case actionTypes.FETCH_SHOP_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.UPDATE_RATING:
      return {
        ...state,
        rating: action.rating
      };
    case actionTypes.ADD_RATING_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.ADD_RATING_SUCCESS:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
