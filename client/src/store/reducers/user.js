import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_USER_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case actionTypes.REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
