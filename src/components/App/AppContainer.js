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

const connected = connect(null, {
  register,
})(App);

const connectedWithData = graphql(query)(connected);

export default connectedWithData;
