import React, { PropTypes } from 'react';
import {
  Button,
  View,
  TextInput,
} from 'react-native';
import { Field } from 'redux-form';
import PhoneNumberInput from '../PhoneNumberInput';

const inputStyles = {
  height: 40,
  width: '100%',
};

const inputViewStyles = {
  borderColor: 'black',
  borderBottomWidth: 1,
};

function LoginForm({
  handleSubmit,
}) {
  return (
    <View style={{ width: '100%' }}>
      <PhoneNumberInput />
      <Button onPress={handleSubmit} title="Log In" />
    </View>
  );
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
