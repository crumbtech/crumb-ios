import React, { PropTypes } from 'react';
import {
  ActivityIndicator,
  Button,
  Text,
  View,
  StyleSheet,
} from 'react-native';

import RegisterForm from '../RegisterForm';
import ConfirmForm from '../ConfirmForm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function App({
  authPending,
  userId,
  authToken,
  firstName,
  lastName,
}) {
  return (
    <View style={styles.container}>
      { authPending && <ActivityIndicator /> }
      { !authPending && !userId && <RegisterForm /> }
      { !authPending && userId && !authToken && <ConfirmForm />}
      { userId && authToken && (
        <Text>You're logged in as {firstName} {lastName}</Text>
      )}
    </View>
  );
}

App.propTypes = {
  authPending: PropTypes.bool.isRequired,
  userId: PropTypes.string,
  authToken: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
};

App.defaultProps = {
  userId: '',
  authToken: '',
  firstName: '',
  lastName: '',
};

export default App;
