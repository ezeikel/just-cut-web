import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  submitted: false,
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
    case actionTypes.SEARCH_SUBMIT:
      return {
        ...state,
        submitted: true
      };
    case actionTypes.SEARCH_CLEAR:
      return {
        ...state,
        submitted: false,
        area: '',
        lat: 0,
        lng: 0,
        results: []
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
    case actionTypes.LOOKUP_COORDINATES_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.LOOKUP_COORDINATES_SUCCESS:
      return {
        ...state,
        lat: action.latitude,
        lng: action.longitude,
        postcode: action.postcode,
        area: action.area,
        loading: false
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
