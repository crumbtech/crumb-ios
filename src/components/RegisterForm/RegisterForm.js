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

const renderFieldFirstName = ({ input: { onChange, value }}) => (
  <View style={inputViewStyles}>
    <TextInput
      style={inputStyles}
      value={value}
      placeholder="First Name"
      onChangeText={onChange}
    />
  </View>
);

const renderFieldLastName = ({ input: { onChange, value }}) => (
  <View style={inputViewStyles}>
    <TextInput
      style={inputStyles}
      value={value}
      placeholder="Last Name"
      onChangeText={onChange}
    />
  </View>
);

function RegisterForm({
  handleSubmit,
}) {
  return (
    <View style={{ width: '100%' }}>
      <Field
        name="firstName"
        component={renderFieldFirstName}
      />
      <Field
        name="lastName"
        component={renderFieldLastName}
      />
      <PhoneNumberInput />
      <Button onPress={handleSubmit} title="Sign Up" />
    </View>
  );
}

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default RegisterForm;
