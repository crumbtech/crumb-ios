import { AsyncStorage } from 'react-native';
import Config from 'react-native-config';

export const AUTH_PENDING = 'crumb/auth/auth-pending';
export const AUTH_TOKEN_PERSISTED = 'crumb/auth/auth-token-set';
export const AUTH_TOKEN_RETRIEVED = 'crumb/auth/auth-token-retrieved';
export const AUTH_TOKEN_NOT_FOUND = 'crumb/auth/no-auth-found';
export const USER_AUTHENTICATED = 'crumb/auth/user-authenticated';
export const AUTH_ERROR = 'crumb/auth/auth-error';
export const LOGIN = 'crumb/auth/login';

const persistAuthToken = (authToken) => async dispatch => {
  dispatch({ type: AUTH_PENDING });
  await AsyncStorage.setItem('@Crumb:authToken', authToken);
  dispatch({ type: AUTH_TOKEN_PERSISTED, authToken });
};

export const getAuthToken = () => async dispatch => {
  dispatch({ type: AUTH_PENDING });
  const token = await AsyncStorage.getItem('@Crumb:authToken');
  if (token) {
    dispatch({ type: AUTH_TOKEN_RETRIEVED, authToken: token });
  } else {
    dispatch({ type: AUTH_TOKEN_NOT_FOUND });
  }
};

const sendRegisterRequest = async (firstName, lastName, phoneNumber) => {
  const res = await fetch(`${Config.BACKEND_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json', // eslint-disable-line quote-props
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      phone_number: `+${phoneNumber}`,
    }),
  });

  return res;
};

export const register = ({
  firstName,
  lastName,
  phoneNumber,
}) => async dispatch => {
  dispatch({ type: AUTH_PENDING });
  const res = await sendRegisterRequest(firstName, lastName, phoneNumber);
  const jsonBody = await res.json();

  if (res.status === 200) {
    dispatch(persistAuthToken(jsonBody.auth_token));
    dispatch({
      type: USER_AUTHENTICATED,
      firstName: jsonBody.first_name,
      lastName: jsonBody.last_name,
    });
  } else if (res.status === 202) {
    // user already exists, we need to login
    dispatch({ type: AUTH_ERROR, error: jsonBody.status });
  }
};

export const login = () => ({
  type: LOGIN,
});

const defaultState = {
  pending: true,
  authToken: null,
  error: null,
  authenticated: false,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case AUTH_PENDING:
      return { ...state, pending: true };
    case AUTH_TOKEN_PERSISTED:
      return {
        ...state,
        authToken: action.authToken,
        authenticated: true,
        pending: false,
      };
    case AUTH_TOKEN_RETRIEVED:
      return {
        ...state,
        authToken: action.authToken,
        authenticated: true,
        pending: false,
      };
    case AUTH_TOKEN_NOT_FOUND:
      return {
        ...state,
        authToken: '',
        authenticated: false,
        pending: false,
      };
    case USER_AUTHENTICATED:
      return {
        ...state,
        firstName: action.firstName,
        lastName: action.lastName,
      };
    case AUTH_ERROR:
      return { ...state, error: action.error, pending: false };
    default:
      return state;
  }
}
