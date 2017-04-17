import { connect } from 'react-redux';

import App from './App';

const Connected = connect(state => ({
  authPending: state.auth.pending,
  userId: state.auth.userId,
  authToken: state.auth.authToken,
  firstName: state.auth.firstName,
  lastName: state.auth.lastName,
}))(App);

export default Connected;
