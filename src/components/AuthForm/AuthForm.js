import React, { PropTypes } from 'react';
import {
  Button,
  View,
} from 'react-native';

function AuthForm({
  handleSubmit,
}) {
  return (
    <View>
      <Button onPress={handleSubmit} title="Sign Up" />
    </View>
  );
}

AuthForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default AuthForm;

