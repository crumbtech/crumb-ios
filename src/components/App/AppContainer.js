import { graphql, gql } from 'react-apollo';
import App from './App';

const query = gql`
  query {
    allCrumbs {
      id,
      status,
    }
  }`;

export default graphql(query)(App);
