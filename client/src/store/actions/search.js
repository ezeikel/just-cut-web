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

export const lookupPostcodeSuccess = (latitude, longitude) => (
  {
    type: actionTypes.LOOKUP_POSTCODE_SUCCESS,
    latitude,
    longitude
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

    const postcodeResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=AIzaSyDQmv3K2R7X6wHANEARZFVxeh7szakcxKs`);


    const postcodeJson = await postcodeResponse.json();
    const { lat, lng } = postcodeJson.results[0].geometry.location;

    dispatch(lookupPostcodeSuccess(lat, lng));

    dispatch(findShopsStart());

    const shopsResponse = await fetch('/find-shops', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        coordinates: [lng, lat  ],
        minDistance: 0,
        maxDistance: 8046.72
      })
    });

    const shopsJson = await shopsResponse.json();

    dispatch(findShopsSuccess(shopsJson));
  }
);
