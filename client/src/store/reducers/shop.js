import * as actionTypes from '../actions/actionTypes';

//TODO: Figure out a way to just have an empty shop object to start off with - Breaks google maps coords
const initialState = {
  shop: {
    name: '',
    photo: '',
    slug: '',
    location: {
      address: '',
      coordinates: [0,0]
    }
  },
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
    default:
      return state;
  }
};

export default reducer;
