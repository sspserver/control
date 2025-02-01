import { gql } from '@apollo/client';

export const gqlCurrentAccountQuery = gql`
  query currentAccount {
    user: currentUser {
      user {
        ID
        username
        status
      }
    }
    account: currentAccount {
      account {
        ID
        status
        title
        description
        logoURI
      }
    }
  }
`;
