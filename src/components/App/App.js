import React, { PropTypes } from 'react';
import {
  ActivityIndicator,
  Button,
  Text,
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

function App({
  authPending,
  isAuthenticated,
  firstName,
  lastName,
  data,
  register,
}) {
  return (
    <View style={styles.container}>
      { authPending && <ActivityIndicator /> }
      { !authPending && !isAuthenticated && <Button onPress={register} title="Sign Up" /> }
      { isAuthenticated && (
        <Text>You're logged in as {firstName} {lastName}</Text>
      )}
    </View>
  );
}

App.propTypes = {
  authPending: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  register: PropTypes.func.isRequired,
};

export default App;
