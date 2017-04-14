/* @flow */
import React from 'react';
import { AppRegistry, AsyncStorage } from 'react-native';
import { ApolloProvider } from 'react-apollo';

import client from './src/apollo';
import store from './src/redux/store';
import { getAuthToken } from './src/redux/modules/auth';
import App from './src/components/App';


/* right away, check to see if there is
an auth token stored on the device */
store.dispatch(getAuthToken());

// this should be removed asap
AsyncStorage.removeItem('@Crumb:authToken');

function Crumb() {
  return (
    <ApolloProvider store={store} client={client}>
      <App />
    </ApolloProvider>
  );
}

AppRegistry.registerComponent('Crumb', () => Crumb);
