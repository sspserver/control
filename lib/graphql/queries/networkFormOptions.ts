import { gql } from '@apollo/client';

export const gqlNetworkFormOptionsQuery = gql`
    query {
        rtbDomain: option(name: "ad.rtb.domain", type: SYSTEM) {
            data: option {
                value
            }
        }
        templateCode: option(name: "ad.template.code", type: SYSTEM) {
            data: option {
                value
            }
        }
        directUrl: option(name: "ad.direct.url", type: SYSTEM) {
            data: option {
                value
            }
        }
        directCode: option(name: "ad.direct.code", type: SYSTEM) {
            data: option {
                value
            }
        }
    }
`;

export const gqlNetworkFormOptionsMutation = gql`
    mutation UpdateNetworkFormOptions($directCode: NullableJSON, $directUrl: NullableJSON, $rtbDomain: NullableJSON, $templateCode: NullableJSON) {
        rtbDomain: setOption (name: "ad.rtb.domain", type: SYSTEM, value: $rtbDomain)  {
            clientMutationId
        }
        templateCode: setOption (name: "ad.template.code", type: SYSTEM, value: $templateCode) {
            clientMutationId
        }
        directUrl: setOption (name: "ad.direct.url", type: SYSTEM, value: $directUrl) {
            clientMutationId
        }
        directCode: setOption (name: "ad.direct.code", type: SYSTEM, value: $directCode) {
            clientMutationId
        }
    }
`;
