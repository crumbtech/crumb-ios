import React, { PropTypes } from 'react';
import {
  ActivityIndicator,
  Button,
  View,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function App({ authPending, data, register }) {
  return (
    <View style={styles.container}>
      {authPending ? (
        <ActivityIndicator />
      ) : (
        <Button onPress={register} title="Sign Up" />
      )}
    </View>
  );
}

App.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  register: PropTypes.func.isRequired,
};

export default App;
