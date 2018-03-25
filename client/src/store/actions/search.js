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

    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=AIzaSyDQmv3K2R7X6wHANEARZFVxeh7szakcxKs`);

    const json = await response.json();
    const { lat, lng } = json.results[0].geometry.location;
    const area = json.results[0].address_components[1].short_name;

    dispatch(lookupPostcodeSuccess(lat, lng, area));

    dispatch(findShopsStart());

    const coordinates = [lng, lat];
    const query = {
      query: `{ findNearestShops(coordinates: [${coordinates}]) { id, name, slug, location { coordinates, address }, distance, photo, tags, ratings } }`
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
