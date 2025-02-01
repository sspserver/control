import { gql } from '@apollo/client';

export const gqlLoginMutation = gql`
  mutation Login($username: String!, $password: String!) {
    login(login: $username, password: $password) {
      token
      expiresAt
      isAdmin
      roles
    }
  }
`;
