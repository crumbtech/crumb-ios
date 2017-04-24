import { AsyncStorage } from 'react-native';
import Config from 'react-native-config';

const AUTH_PENDING = 'crumb/auth/pending';
const AUTH_ERROR = 'crumb/auth/error';
const REGISTER_COMPLETE = 'crumb/auth/register-complete';
const LOGIN_COMPLETE = 'crumb/auth/login-complete';
const CONFIRM_COMPLETE = 'crumb/auth/confirm-complete';
const USER_RETRIEVED = 'crumb/auth/user-retrieved';
const NO_USER_ON_DEVICE = 'crumb/auth/user-not-found';
const CHANGE_FORM_TYPE = 'crumb/auth/change-form-type';

const persistUser = (authToken, userId, firstName, lastName) => {
  AsyncStorage.multiSet([
    ['@Crumb:authToken', authToken],
    ['@Crumb:userId', userId],
    ['@Crumb:firstName', firstName],
    ['@Crumb:lastName', lastName],
  ]);
};

export const getPeristedUser = () => async dispatch => {
  dispatch({ type: AUTH_PENDING });
  const authToken = await AsyncStorage.getItem('@Crumb:authToken');
  const userId = await AsyncStorage.getItem('@Crumb:userId');
  const firstName = await AsyncStorage.getItem('@Crumb:firstName');
  const lastName = await AsyncStorage.getItem('@Crumb:lastName');
  const user = { authToken, userId, firstName, lastName };

  if (authToken && userId && firstName && lastName) {
    dispatch({ type: USER_RETRIEVED, user });
  } else {
    dispatch({ type: NO_USER_ON_DEVICE });
  }
};

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

export const login = ({
  phoneNumber,
}) => async dispatch => {
  dispatch({ type: AUTH_PENDING });

  const res = await fetch(`${Config.BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json', // eslint-disable-line quote-props
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      phone_number: `+${phoneNumber}`,
    }),
  });

  const jsonBody = await res.json();

  if (res.status === 200) {
    dispatch({
      type: LOGIN_COMPLETE,
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
  const state = getState();
  const res = await fetch(`${Config.BACKEND_URL}/auth/confirm`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json', // eslint-disable-line quote-props
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: state.auth.userId,
      confirmation_code: confirmationCode,
    }),
  });

  const jsonBody = await res.json();

  if (res.status === 200) {
    dispatch({
      type: CONFIRM_COMPLETE,
      authToken: jsonBody.auth_token,
    });
    const { userId, firstName, lastName } = state.auth;
    persistUser(jsonBody.auth_token, userId, firstName, lastName);
  } else {
    dispatch({ type: AUTH_ERROR, error: jsonBody.status });
  }
};

export const showRegisterForm = () => dispatch => dispatch({ type: CHANGE_FORM_TYPE, form: 'register' });
export const showLoginForm = () => dispatch => dispatch({ type: CHANGE_FORM_TYPE, form: 'login' });

const defaultState = {
  formType: 'register',
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
    case LOGIN_COMPLETE:
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
    case USER_RETRIEVED:
      return {
        ...state,
        pending: false,
        ...action.user,
      };
    case NO_USER_ON_DEVICE:
      return {
        ...state,
        pending: false,
      };
    case CHANGE_FORM_TYPE:
      return {
        ...state,
        formType: action.form,
      };
    default:
      return state;
  }
}
