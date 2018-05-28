import * as actionTypes from './actionTypes';

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
    const response = await fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signQuery)
    });

    const json = await response.json();
    const { signedRequest, url } = json.data.signS3;

    await fetch(signedRequest, {
      method: 'PUT',
      body: photo,
      headers: { 'Content-Type': `${photo.type}` }
    });

    const query = {
      query: `mutation {createShop(name: "${name}", location: {coordinates: [${coordinates}], address: "${location.address}"}, photo: "${url}") {_id, name}}`
    };

    await fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query)
    });

    dispatch(addShopSuccess());
  };
};
