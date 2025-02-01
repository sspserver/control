import { gql } from '@apollo/client';

export const gqlCurrentAccountTotalQuery = gql`
  query {
    user: currentUser {
      user {
        ID
        name: username
        username
        email: username
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
    session: currentSession {
      token
      expiresAt
      isAdmin
      roles
    }
  }
`;
