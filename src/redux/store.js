import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import Config from 'react-native-config';

import authReducer from './modules/auth';
import apolloClient from '../apollo';

const reducer = combineReducers({
  auth: authReducer,
  apollo: apolloClient.reducer(),
  form: formReducer,
});

const loggerMiddleware = createLogger();
let middleware;

if (Config.CRUMB_ENV === 'dev') {
  middleware = applyMiddleware(
    apolloClient.middleware(),
    thunk,
    loggerMiddleware,
  );
} else {
  middleware = applyMiddleware(
    apolloClient.middleware(),
    thunk,
  );
}

const store = createStore(
  reducer,
  {}, // initial state
  middleware,
);


export default store;
