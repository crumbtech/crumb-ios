import React, { PropTypes } from 'react';
import {
  Button,
  View,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function App({ data, register }) {
  return (
    <View style={styles.container}>
      <Button onPress={register} title="Sign Up" />
    </View>
  );
}

App.propTypes = {
  data: PropTypes.object,
  register: PropTypes.func,
};

export default App;
