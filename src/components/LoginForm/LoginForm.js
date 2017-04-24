import React, { PropTypes } from 'react';
import {
  Button,
  View,
} from 'react-native';
import PhoneNumberInput from '../PhoneNumberInput';

function LoginForm({
  handleSubmit,
  showRegisterForm,
}) {
  return (
    <View style={{ width: '100%' }}>
      <PhoneNumberInput />
      <Button onPress={handleSubmit} title="Log In" />
      <Button onPress={showRegisterForm} title="Sign Up" />
    </View>
  );
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  showRegisterForm: PropTypes.func.isRequired,
};

export default LoginForm;
