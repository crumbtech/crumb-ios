import React, { PropTypes } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

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

export default App;
