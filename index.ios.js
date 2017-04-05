import React, { PropTypes } from 'react';
import { AppRegistry, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { ApolloClient, createNetworkInterface, ApolloProvider, graphql, gql } from 'react-apollo';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:5000/graphql',
});

const client = new ApolloClient({ networkInterface });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const query = gql`
  query {
    allCrumbs {
      id,
      status,
    }
  }`;

function App({ data }) {
  return (
    <View style={styles.container}>
      {data.loading ? (
        <ActivityIndicator />
      ) : (
        data.allCrumbs.map(crumb => (
          <Text>{`${crumb.id}: ${crumb.status}`}</Text>
        ))
      )}
    </View>
  );
}

App.propTypes = {
  data: PropTypes.object,
};

const AppWithData = graphql(query)(App);


function Root() {
  return (
    <ApolloProvider client={client}>
      <AppWithData />
    </ApolloProvider>
  );
}

AppRegistry.registerComponent('Crumb', () => Root);
