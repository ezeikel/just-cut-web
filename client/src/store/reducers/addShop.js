import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  name: '',
  location: {
    address: '',
    coordinates: {
      lng: 0,
      lat: 0
    }
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HANDLE_FORM_INPUT_CHANGE:
      return {
        ...state,
        location: {
          ...state.location,
          coordinates: {
            ...state.location.coordinates
          }
        },
        [action.name]: action.value
      };
    case actionTypes.HANDLE_FORM_INPUT_ADDRESS_CHANGE:
      return {
        ...state,
        location: {
          ...state.location,
          address: action.value,
          coordinates: {
            ...state.location.coordinates
          }
        },
      };
    case actionTypes.HANDLE_FORM_INPUT_ADDRESS_COORDINATES_CHANGE:
      return {
        ...state,
        location: {
          ...state.location,
          coordinates: {
            ...state.location.coordinates,
            [action.name]: action.value
          }
        },
      };
    case actionTypes.ADD_SHOP_START:
      return {
        ...state,
        location: {
          ...state.location,
          coordinates: {
            ...state.location.coordinates
          }
        },
        loading: true
      };
    case actionTypes.ADD_SHOP_SUCCESS:
      return {
        ...state,
        name: '',
        location: {
          ...state.location,
          address: '',
          coordinates: {
            ...state.location.coordinates,
            lng: 0,
            lat: 0
          }
        },
        loading: false
      };
    case actionTypes.ADD_SHOP_FAIL:
      return {
        ...state,
        location: {
          ...state.location,
          coordinates: {
            ...state.location.coordinates
          }
        },
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
