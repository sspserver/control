import { gql } from '@apollo/client';

export const gqlResetUserPasswordMutation = gql`
  mutation ResetUserPassword($email: String!) {
    resetUserPassword(email: $email) {
      status
      message
    }
  }
`;

export const gqlUpdateUserPasswordMutation = gql`
  mutation UpdateUserPassword($token: String!, $email: String!, $password: String!) {
    updateUserPassword(token: $token, email: $email, password: $password) {
      status
      message
    }
  }
`;
