import { AsyncStorage } from 'react-native';
import Config from 'react-native-config';

export const REGISTER = 'crumb/auth/register';
export const REGISTER_COMPLETE = 'crumb/auth/register-complete';
export const LOGIN = 'crumb/auth/login';

const persistToken = (authToken) => {
  AsyncStorage.setItem('@Crumb:authToken', authToken);
};

export const register = () => dispatch => {
  dispatch({ type: REGISTER });

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
        dispatch({
          type: REGISTER_COMPLETE,
          authToken: json.auth_token,
        });
        persistToken(json.auth_token);
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
  pending: false,
  authToken: '',
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case REGISTER:
      return { ...state, pending: true };
    case REGISTER_COMPLETE:
      return { ...state, authToken: action.authToken };
    default:
      return state;
  }
}
