import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import Config from 'react-native-config';
import authReducer from './modules/auth';
import apolloClient from '../apollo';

const reducer = combineReducers({
  auth: authReducer,
  apollo: apolloClient.reducer(),
});

const logger = createLogger();
let middleware;

if (Config.CRUMB_ENV === 'dev') {
  middleware = applyMiddleware(
    apolloClient.middleware(),
    logger,
  );
} else {
  middleware = applyMiddleware(
    apolloClient.middleware(),
  );
}

export default createStore(
  reducer,
  {}, // initial state
  middleware,
);
