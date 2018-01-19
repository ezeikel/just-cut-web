import * as actionTypes from './actionTypes';

export const handleFormInputPostcodeChange = (value) => (
  {
    type: actionTypes.HANDLE_FORM_INPUT_POSTCODE_CHANGE,
    value
  }
);

export const lookupPostcodeSuccess = (latitude, longitude) => (
  {
    type: actionTypes.LOOKUP_POSTCODE_SUCCESS,
    latitude,
    longitude
  }
);

export const lookupPostcodeStart = () => (
  {
    type: actionTypes.LOOKUP_POSTCODE_START
  }
);

export const lookupPostcode = (postcode) => (
  async dispatch => {
    dispatch(lookupPostcodeStart());

    const response = await fetch(`http://api.postcodes.io/postcodes/${postcode}`);
    const json = await response.json();

    const { latitude, longitude } = json.result;

    dispatch(lookupPostcodeSuccess(latitude, longitude));
  }
);
