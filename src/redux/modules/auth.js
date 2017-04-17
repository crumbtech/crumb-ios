import { AsyncStorage } from 'react-native';
import Config from 'react-native-config';

const AUTH_PENDING = 'crumb/auth/pending';
const AUTH_ERROR = 'crumb/auth/error';
const REGISTER_COMPLETE = 'crumb/auth/register-complete';
const CONFIRM_COMPLETE = 'crumb/auth/confirm-complete';

export const register = ({
  firstName,
  lastName,
  phoneNumber,
}) => async dispatch => {
  dispatch({ type: AUTH_PENDING });

  const res = await fetch(`${Config.BACKEND_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json', // eslint-disable-line quote-props
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      phone_number: `+${phoneNumber}`,
    }),
  });

  const jsonBody = await res.json();

  if (res.status === 200) {
    dispatch({
      type: REGISTER_COMPLETE,
      firstName: jsonBody.first_name,
      lastName: jsonBody.last_name,
      userId: jsonBody.user_id,
    });
  } else {
    dispatch({ type: AUTH_ERROR, error: jsonBody.status });
  }
};

export const confirm = ({ confirmationCode }) => async (dispatch, getState) => {
  dispatch({ type: AUTH_PENDING });
  console.log(getState());
  const res = await fetch(`${Config.BACKEND_URL}/auth/confirm`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json', // eslint-disable-line quote-props
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: getState().auth.userId,
      confirmation_code: confirmationCode,
    }),
  });

  const jsonBody = await res.json();

  if (res.status === 200) {
    dispatch({
      type: CONFIRM_COMPLETE,
      authToken: jsonBody.auth_token,
    });
  } else {
    dispatch({ type: AUTH_ERROR, error: jsonBody.status });
  }
};

const defaultState = {
  pending: false,
  error: null,
  authToken: null,
  firstName: null,
  lastName: null,
  userId: null,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case AUTH_PENDING:
      return { ...state, pending: true };
    case AUTH_ERROR:
      return { ...state, pending: false, error: action.error };
    case REGISTER_COMPLETE:
      return {
        ...state,
        pending: false,
        userId: action.userId,
        firstName: action.firstName,
        lastName: action.lastName,
      };
    case CONFIRM_COMPLETE:
      return {
        ...state,
        pending: false,
        authToken: action.authToken,
      };
    default:
      return state;
  }
}
