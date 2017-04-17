/* @flow */
import React from 'react';
import { AppRegistry } from 'react-native';
import { ApolloProvider } from 'react-apollo';

import client from './src/apollo';
import store from './src/redux/store';
import { getPeristedUser } from './src/redux/modules/auth';
import App from './src/components/App';

// uncomment to remove current user from dev device
/*
 * import { AsyncStorage } from 'react-native';
 *AsyncStorage.multiRemove([
 *  '@Crumb:authToken',
 *  '@Crumb:userId',
 *  '@Crumb:firstName',
 *  '@Crumb:lastName',
 *]);
 */


/* right away, check to see if there is
a user stored on the device */
store.dispatch(getPeristedUser());


function Crumb() {
  return (
    <ApolloProvider store={store} client={client}>
      <App />
    </ApolloProvider>
  );
}

AppRegistry.registerComponent('Crumb', () => Crumb);
