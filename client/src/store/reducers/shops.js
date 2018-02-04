import * as actionTypes from '../actions/actionTypes';

const initialState = {
  shops: [],
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SHOPS_START:
      return {
        ...state,
        shops: [...state.shops],
        loading: true
      };
    case actionTypes.FETCH_SHOPS_SUCCESS:
      return {
        ...state,
        shops: action.shops,
        loading: false
      };
    case actionTypes.FETCH_SHOPS_FAIL:
      return {
        ...state,
        shops: [...state.shops],
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
