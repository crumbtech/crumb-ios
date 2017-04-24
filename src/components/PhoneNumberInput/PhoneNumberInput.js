import React, { PropTypes } from 'react';
import { TextInput, View } from 'react-native';
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

export default () => (
  <Field
    name="phoneNumber"
    component={renderFieldPhoneNumber}
    normalize={formatPhoneNumber}
  />
);
