import { gql } from '@apollo/client';

export const gqlSwitchAccountMutation = gql`
  mutation SwitchAccount($accountID: Int!) {
    switchAccount(id: $accountID) {
      token
      expiresAt
      isAdmin
      roles
    }
  }
`;
