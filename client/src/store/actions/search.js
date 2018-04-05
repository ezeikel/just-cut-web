import * as actionTypes from './actionTypes';

export const handleFormInputPostcodeChange = (value) => (
  {
    type: actionTypes.HANDLE_FORM_INPUT_POSTCODE_CHANGE,
    value
  }
);

export const lookupPostcodeStart = () => (
  {
    type: actionTypes.LOOKUP_POSTCODE_START
  }
);

export const lookupPostcodeSuccess = (latitude, longitude, area) => (
  {
    type: actionTypes.LOOKUP_POSTCODE_SUCCESS,
    latitude,
    longitude,
    area
  }
);

export const findShopsStart = () => (
  {
    type: actionTypes.FIND_SHOPS_START
  }
);

export const findShopsSuccess = (shops) => (
  {
    type: actionTypes.FIND_SHOPS_SUCCESS,
    shops
  }
);

export const findShopsFail = (error) => (
  {
    type: actionTypes.FIND_SHOPS_FAIL,
    error
  }
);

export const lookupPostcode = (postcode) => (
  async dispatch => {
    dispatch(lookupPostcodeStart());

    const response = await fetch(`https://api.postcodes.io/postcodes/${postcode}`);
    const json = await response.json();
    const { longitude, latitude, admin_ward } = json.result;

    dispatch(lookupPostcodeSuccess(latitude, longitude, admin_ward));

    dispatch(findShopsStart());

    const coordinates = [longitude, latitude];
    const query = {
      query: `{ findNearestShops(coordinates: [${coordinates}]) { _id, name, slug, location { coordinates, address }, distance, photo, tags, ratings } }`
    };

    const shopsResponse = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query)
    });

    const shopsJson = await shopsResponse.json();
    const shops = shopsJson.data.findNearestShops;

    dispatch(findShopsSuccess(shops));
  }
);

export const lookupCoordinatesStart = () => (
  {
    type: actionTypes.LOOKUP_COORDINATES_START
  }
);

export const lookupCoordinatesSuccess = (latitude, longitude, postcode, area) => (
  {
    type: actionTypes.LOOKUP_COORDINATES_SUCCESS,
    latitude,
    longitude,
    postcode,
    area
  }
);

export const lookupCoordinatesFail = (error) => (
  {
    type: actionTypes.LOOKUP_COORDINATES_FAIL,
    error
  }
);

export const lookupCoordinates = (lat, lng) => (
  async dispatch => {
    dispatch(lookupCoordinatesStart());

    const response = await fetch(`https://api.postcodes.io/postcodes?lon=${lng}&lat=${lat}`);
    const json = await response.json();
    const { postcode, admin_ward } = json.result[0];

    dispatch(lookupCoordinatesSuccess(lat, lng, postcode, admin_ward));
    dispatch(findShopsStart());

    const coordinates = [lng, lat];
    const query = {
      query: `{ findNearestShops(coordinates: [${coordinates}]) { _id, name, slug, location { coordinates, address }, distance, photo, tags, ratings } }`
    };

    const shopsResponse = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query)
    });

    const shopsJson = await shopsResponse.json();
    const shops = shopsJson.data.findNearestShops;

    dispatch(findShopsSuccess(shops));
  }
);
