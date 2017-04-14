import { connect } from 'react-redux';

import App from './App';

const Connected = connect(state => ({
  authPending: state.auth.pending,
  isAuthenticated: state.auth.authenticated,
  firstName: state.auth.firstName,
  lastName: state.auth.lastName,
}))(App);

export default Connected;
