import React, { PropTypes } from 'react';
import {
  Button,
  View,
} from 'react-native';

function AuthForm({
  register,
}) {
  return (
    <View>
      <Button onPress={register} title="Sign Up" />
    </View>
  );
}

AuthForm.propTypes = {
  register: PropTypes.func.isRequired,
};

export default AuthForm;
