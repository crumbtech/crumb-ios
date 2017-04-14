import React, { PropTypes } from 'react';
import {
  ActivityIndicator,
  Button,
  Text,
  View,
  StyleSheet,
} from 'react-native';

import AuthForm from '../AuthForm';

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
  register,
}) {
  return (
    <View style={styles.container}>
      { authPending && <ActivityIndicator /> }
      { !authPending && !isAuthenticated && <AuthForm />}
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
  register: PropTypes.func.isRequired,
};

export default App;
