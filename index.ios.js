/* @flow */
import React from 'react';
import { AppRegistry } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import client from './src/apollo';
import store from './src/redux/store';
import App from './src/components/App';

function Crumb() {
  return (
    <ApolloProvider store={store} client={client}>
      <App />
    </ApolloProvider>
  );
}

AppRegistry.registerComponent('Crumb', () => Crumb);
