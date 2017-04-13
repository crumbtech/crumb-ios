import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import Config from 'react-native-config';

import authReducer from './modules/auth';
import apolloClient from '../apollo';

const reducer = combineReducers({
  auth: authReducer,
  apollo: apolloClient.reducer(),
});

const loggerMiddleware = createLogger();
let middleware;

if (Config.CRUMB_ENV === 'dev') {
  middleware = applyMiddleware(
    apolloClient.middleware(),
    loggerMiddleware,
    thunk,
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
