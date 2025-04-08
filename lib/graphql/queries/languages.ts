import { gql } from '@apollo/client';

export const gqlLanguagesQuery = gql`
    query Languages {
        languages(filter: null) {
            ID
            iso2
            name
            nativeName
        }
    }
`;
