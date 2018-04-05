import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  postcode: '',
  area: '',
  lat: 0,
  lng: 0,
  results: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HANDLE_FORM_INPUT_POSTCODE_CHANGE:
      return {
        ...state,
        postcode: action.value
      };
    case actionTypes.LOOKUP_POSTCODE_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.LOOKUP_POSTCODE_SUCCESS:
      return {
        ...state,
        lat: action.latitude,
        lng: action.longitude,
        area: action.area,
        loading: false
      };
    case actionTypes.LOOKUP_COORDINATES:
      return {
        ...state,
        lat: action.latitude,
        lng: action.longitude,

        // area: action.area, TODO: Maybe take coords and lookup area if needed?
        // loading: false
      };
    case actionTypes.FIND_SHOPS_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.FIND_SHOPS_SUCCESS:
      return {
        ...state,
        results: action.shops,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
