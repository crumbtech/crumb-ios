import React, { PropTypes } from 'react';
import {
  Button,
  View,
  TextInput,
} from 'react-native';
import { Field } from 'redux-form';

const inputStyles = {
  height: 40,
  width: '100%',
};

const inputViewStyles = {
  borderColor: 'black',
  borderBottomWidth: 1,
};

const renderFieldConfirmationCode = ({ input: { onChange, value }}) => (
  <View style={inputViewStyles}>
    <TextInput
      style={inputStyles}
      value={value}
      placeholder="Confirmation Code"
      onChangeText={onChange}
    />
  </View>
);

function ConfirmForm({
  handleSubmit,
}) {
  return (
    <View style={{ width: '100%' }}>
      <Field
        name="confirmationCode"
        component={renderFieldConfirmationCode}
      />
      <Button onPress={handleSubmit} title="Confirm Your Phone Number" />
    </View>
  );
}

ConfirmForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default ConfirmForm;
