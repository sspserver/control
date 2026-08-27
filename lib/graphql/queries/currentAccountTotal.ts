import { gql } from '@apollo/client';

export const gqlCurrentAccountTotalQuery = gql`
  query {
    user: currentUser {
      user {
        ID
        email
        status
      }
    }
    account: currentAccount {
      account {
        ID
        status
        name
        description
      }
    }
    session: currentSession {
      token
      expiresAt
      isAdmin
      roles
    }
    agreement: nextAgreement {
      codename
      textHTML
      textMD
      title
      type
      version
      acceptedAt
      acceptAccountID
      acceptByUserID
    }
  }
`;
