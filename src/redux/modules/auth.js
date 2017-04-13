import { AsyncStorage } from 'react-native';
import Config from 'react-native-config';

export const AUTH_PENDING = 'crumb/auth/auth-pending';
export const AUTH_TOKEN_PERSISTED = 'crumb/auth/auth-token-set';
export const AUTH_TOKEN_RETRIEVED = 'crumb/auth/auth-token-retrieved';
export const LOGIN = 'crumb/auth/login';

const persistAuthToken = (authToken) => async dispatch => {
  dispatch({ type: AUTH_PENDING });
  await AsyncStorage.setItem('@Crumb:authToken', authToken);
  dispatch({ type: AUTH_TOKEN_PERSISTED, authToken });
};

export const getAuthToken = () => async dispatch => {
  dispatch({ type: AUTH_PENDING });
  const token = await AsyncStorage.getItem('@Crumb:authToken');
  dispatch({ type: AUTH_TOKEN_RETRIEVED, authToken: token });
};

export const register = () => dispatch => {
  dispatch({ type: AUTH_PENDING });

  fetch(`${Config.BACKEND_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json', // eslint-disable-line quote-props
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      phone_number: '+12345678910',
      password: 'password',
    }),
  })
  .then(res => {
    if (res.status === 200) {
      res.json().then(json => {
        dispatch(persistAuthToken(json.auth_token));
      });
    } else if (res.status === 202) {
      console.log('user already exists');
    }
  });
};

export const login = () => ({
  type: LOGIN,
});

const defaultState = {
  pending: true,
  authToken: null,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case AUTH_PENDING:
      return { ...state, pending: true };
    case AUTH_TOKEN_PERSISTED:
      return { ...state, authToken: action.authToken, pending: false };
    case AUTH_TOKEN_RETRIEVED:
      return { ...state, authToken: action.authToken, pending: false };
    default:
      return state;
  }
}
