/* @flow */
import React from 'react';
import { AppRegistry } from 'react-native';
import {
  ApolloClient,
  createNetworkInterface,
  ApolloProvider,
} from 'react-apollo';
import Config from 'react-native-config';
import App from './src/App';

const networkInterface = createNetworkInterface({
  uri: Config.GRAPHQL_URL,
});

const client = new ApolloClient({ networkInterface });

function Crumb() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

AppRegistry.registerComponent('Crumb', () => Crumb);
