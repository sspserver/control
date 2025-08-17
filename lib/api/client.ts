import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { getPublicEnv } from '@configs/api';

const client = new ApolloClient({
  link: new HttpLink({ uri: getPublicEnv().API_URL || getPublicEnv().NEXT_PUBLIC_API_URL }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          listApplications: {
            merge(existing, incoming) {
              return {
                ...existing,
                ...incoming,
              };
            },
          },
        },
      },
    },
  }),
});

export default client;
