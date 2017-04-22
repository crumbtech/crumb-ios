import React, { PropTypes } from 'react';
import {
  Button,
  View,
  TextInput,
} from 'react-native';
import { Field } from 'redux-form';
import { formatPhoneNumber } from '../../lib';

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

const renderFieldPhoneNumber = ({ input: { onChange, value } }) => (
  <View style={inputViewStyles}>
    <TextInput
      style={inputStyles}
      value={value}
      placeholder="+1 (555) 555 - 555"
      onChangeText={onChange}
    />
  </View>
);


function AuthForm({
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
      <Field
        name="phoneNumber"
        component={renderFieldPhoneNumber}
        normalize={formatPhoneNumber}
      />
      <Button onPress={handleSubmit} title="Sign Up" />
    </View>
  );
}

AuthForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default AuthForm;
