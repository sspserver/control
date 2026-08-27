import { gql } from '@apollo/client';

export const gqlCurrentAccountQuery = gql`
  query currentAccount {
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
