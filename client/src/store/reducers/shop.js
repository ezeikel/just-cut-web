import * as actionTypes from '../actions/actionTypes';

const initialState = {
  shops: [],
  loading: false,
  name: '',
  location: {
    address: '',
    coordinates: {
      lng: 0,
      lat: 0,
    },
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SHOPS_START:
      return {
        ...state,
        shops: [...state.shops],
        location: {
          ...state.location,
          coordinates: {
            ...state.location.coordinates,
          },
        },
        loading: true,
      };
    case actionTypes.FETCH_SHOPS_SUCCESS:
      return {
        ...state,
        shops: action.shops,
        location: {
          ...state.location,
          coordinates: {
            ...state.location.coordinates,
          },
        },
        loading: false,
      };
    case actionTypes.FETCH_SHOPS_FAIL:
      return {
        ...state,
        shops: [...state.shops],
        location: {
          ...state.location,
          coordinates: {
            ...state.location.coordinates,
          },
        },
        loading: false,
      };
    case actionTypes.HANDLE_FORM_INPUT_CHANGE:
      return {
        ...state,
        shops: [...state.shops],
        location: {
          ...state.location,
          coordinates: {
            ...state.location.coordinates,
          },
        },
        [action.name]: action.value,
      };
    case actionTypes.HANDLE_FORM_INPUT_ADDRESS_CHANGE:
      return {
        ...state,
        shops: [...state.shops],
        location: {
          ...state.location,
          address: action.value,
          coordinates: {
            ...state.location.coordinates,
          },
        },
      };
    case actionTypes.HANDLE_FORM_INPUT_ADDRESS_COORDINATES_CHANGE:
      return {
        ...state,
        shops: [...state.shops],
        location: {
          ...state.location,
          coordinates: {
            ...state.location.coordinates,
            [action.name]: action.value,
          },
        },
      };
    case actionTypes.ADD_SHOP_START:
      return {
        ...state,
        shops: [...state.shops],
        location: {
          ...state.location,
          coordinates: {
            ...state.location.coordinates,
          },
        },
        loading: true,
      };
    case actionTypes.ADD_SHOP_SUCCESS:
      return {
        ...state,
        shops: [...state.shops],
        name: '',
        location: {
          ...state.location,
          address: '',
          coordinates: {
            ...state.location.coordinates,
            lng: 0,
            lat: 0,
          },
        },
        loading: false,
      };
    case actionTypes.ADD_SHOP_FAIL:
      return {
        ...state,
        shops: [...state.shops],
        location: {
          ...state.location,
          coordinates: {
            ...state.location.coordinates,
          },
        },
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
