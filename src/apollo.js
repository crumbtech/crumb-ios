import { ApolloClient, createNetworkInterface } from 'react-apollo';
import Config from 'react-native-config';

const networkInterface = createNetworkInterface({
  uri: Config.GRAPHQL_URL,
});

export default new ApolloClient({ networkInterface });
