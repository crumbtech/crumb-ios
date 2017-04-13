import { graphql, gql } from 'react-apollo';
import { connect } from 'react-redux';

import App from './App';
import { register } from '../../redux/modules/auth';

const query = gql`
  query {
    allCrumbs {
      id,
      status,
    }
  }`;

const Connected = connect(state => ({
  authPending: state.auth.pending,
}), {
  register,
})(App);

const ConnectedWithData = graphql(query)(Connected);

export default ConnectedWithData;
