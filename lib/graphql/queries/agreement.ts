import { gql } from '@apollo/client';

export const gqlGetAgreementQuery = gql`
    query nextAgreement {
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
