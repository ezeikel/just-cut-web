import * as actionTypes from './actionTypes';

export const registerUserSuccess = () => ({
  type: actionTypes.REGISTER_USER_SUCCESS
});

export const registerUserFail = () => ({
  type: actionTypes.REGISTER_USER_FAIL
});

export const registerUserStart = () => ({
  type: actionTypes.REGISTER_USER_START
});

export const registerUser = (email, fullName, username, password, passwordConfirm) => (
  async dispatch => {
    dispatch(registerUserStart());

    const query = {
      query: `mutation {registerUser(email: "${email}", fullName: "${fullName}", username: "${username}", password: "${password}", passwordConfirm: "${passwordConfirm}") {_id}}`
    };

    const result = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
    });

    if (result.status === 200) {
      dispatch(registerUserSuccess());
    } else {
      dispatch(registerUserFail());
    }
  }
);
