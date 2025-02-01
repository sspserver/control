import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { apiUrl } from '@configs/api';

const client = new ApolloClient({
  link: new HttpLink({ uri: apiUrl }),
  cache: new InMemoryCache(),
});

export default client;
