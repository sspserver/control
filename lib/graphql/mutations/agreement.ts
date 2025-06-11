import { gql } from '@apollo/client';

export const gqlAcceptAgreementMutation = gql`
    mutation AcceptAgreement(
        $codename: String!,
        $signature: String!,
        $date: DateTime!
    ) {
      acceptAgreement(
      codename:  $codename, 
      signature: $signature, 
      date: $date
    ) {
        codename
        version
        title
        type
        textMD
        textHTML
        signature
        acceptedAt
        acceptAccountID
        acceptByUserID
        createdAt
      }
    }
`;
