import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchShopsSuccess = (shops) => (
  {
    type: actionTypes.FETCH_SHOPS_SUCCESS,
    shops
  }
);

export const fetchShopsFail = (error) => (
  {
    type: actionTypes.FETCH_SHOPS_FAIL,
    error
  }
);

export const fetchShopsStart = () => (
  {
    type: actionTypes.FETCH_SHOPS_START
  }
);

export const fetchShops = () => (
  async dispatch => {
    dispatch(fetchShopsStart());

    let fetchedShops = await fetch('/shops');
    fetchedShops = await fetchedShops.json();

    dispatch(fetchShopsSuccess(fetchedShops));
  }
);

export const handleFormInputChange = (name, value) => (
  {
    type: actionTypes.HANDLE_FORM_INPUT_CHANGE,
    name,
    value
  }
);

export const handleFormInputAddressChange = (value) => (
  {
    type: actionTypes.HANDLE_FORM_INPUT_ADDRESS_CHANGE,
    value
  }
);

export const handleFormInputAddressCoordinatesChange = (name, value) => (
  {
    type: actionTypes.HANDLE_FORM_INPUT_ADDRESS_COORDINATES_CHANGE,
    name,
    value
  }
);

export const addShopSuccess = () => (
  {
    type: actionTypes.ADD_SHOP_SUCCESS
  }
);

export const addShopFail = () => (
  {
    type: actionTypes.ADD_SHOP_FAIL
  }
);

export const addShopStart = () => (
  {
    type: actionTypes.ADD_SHOP_START
  }
);

export const addShop = (name, location, photo) => {
  // converting coordinates object to array so that it can be stored as Point in mongodb
  const { lng, lat } = location.coordinates;
  const coordinates = [lng, lat];

  return async dispatch => {
    dispatch(addShopStart());

    const signQuery = {
      query: `mutation {signS3(filetype: "${photo.type}") {signedRequest, url}}`
    };

    // sending mutation via graphql api
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signQuery)
    });

    const json = await response.json();
    const { signedRequest, url } = json.data.signS3;

    const options = {
      method: 'PUT',
      headers: { 'Content-Type': `${photo.type}` }
    };

    await axios.put(signedRequest, photo, options);

    const query = {
      query: `mutation {createShop(name: "${name}", location: {coordinates: [${coordinates}], address: "${location.address}"}, photo: "${url}") {id, name}}`
    };

    await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query)
    });

    dispatch(addShopSuccess());
  };
};
