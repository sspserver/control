import { gql } from '@apollo/client';

export const gqlGetTrafficRouters = gql`
    query getTrafficRouter($id: ID64!) {
        result: trafficRouter(ID: $id) {
            data: router {
                ID
                title
                active
                description
                percent
                secure
                adBlock
                privateBrowsing
                IP
                RTBSourceIDs
                formatCodes
                zoneIDs
                applicationIDs
                deviceTypeIDs
                deviceIDs
                OSIDs
                browserIDs
                countryCodes
                languageCodes
                carrierIDs
            }
        }
    }
`;

export const gqlTrafficRouters = gql`
    query listTrafficRouter(
        $filter: TrafficRouterListFilter = null,
        $order: [TrafficRouterListOrder!],
        $page: Page,
    ) {
        listTrafficRouters(filter: $filter, order: $order, page: $page) {
            pageInfo {
                total
                page
                count
            }
            list {
                ID
                active
                description
                title
                browsers {
                    ID
                    name
                    version
                }
                formats {
                    ID
                    description
                } 
                percent
                privateBrowsing
                secure
                updatedAt
                RTBSources: RTBSources {
                    ID
                    title
                    active
                }
                applications {
                    ID
                    title
                    active
                }
            }
        }
    }
`;

export const gqlupdateTrafficRouterMutation = gql`
    mutation updateTrafficRouter(
        $id: ID64!,
        $active: ActiveStatus!,
        $title: String!,
        $description: String!,
        $percent: Float!,
        $secure: AnyOnlyExclude!,
        $adBlock: AnyOnlyExclude!,
        $privateBrowsing: AnyOnlyExclude!,
        $IP: AnyIPv4IPv6!
        $RTBSourceIDs: [ID64!]!
        $applicationIDs: [ID64!]
        $zoneIDs: [ID64!]
        $formatCodes: [String!]
        $deviceTypeIDs: [ID64!]
        $deviceIDs: [ID64!]
        $OSIDs: [ID64!]
        $browserIDs: [ID64!]
        $carrierIDs: [ID64!]
        $countryCodes: [String!]
        $languageCodes: [String!]
    ) {
        result: updateTrafficRouter(ID: $id, input: {
            title: $title,
            active: $active,
            description: $description,
            percent: $percent,
            secure: $secure,
            adBlock: $adBlock,
            privateBrowsing: $privateBrowsing,
            IP: $IP,
            RTBSourceIDs: $RTBSourceIDs
            applicationIDs:  $applicationIDs
            zoneIDs: $zoneIDs
            formatCodes: $formatCodes
            deviceTypeIDs: $deviceTypeIDs
            deviceIDs: $deviceIDs
            OSIDs: $OSIDs
            browserIDs: $browserIDs
            carrierIDs: $carrierIDs
            countryCodes: $countryCodes
            languageCodes: $languageCodes
        }) {
            clientMutationID
            object: router {
                ID
                description
            }
        }
    }
`;

export const gqlTrafficRoutersCreateMutation = gql`
    mutation createTrafficRouter(    
        $active: ActiveStatus!,
        $title: String!,
        $description: String!,
        $percent: Float!,
        $secure: AnyOnlyExclude!,
        $adBlock: AnyOnlyExclude!,
        $privateBrowsing: AnyOnlyExclude!,
        $IP: AnyIPv4IPv6!
        $RTBSourceIDs: [ID64!]!
        $applicationIDs: [ID64!]
        $zoneIDs: [ID64!]
        $formatCodes: [String!]
        $deviceTypeIDs: [ID64!]
        $deviceIDs: [ID64!]
        $OSIDs: [ID64!]
        $browserIDs: [ID64!]
        $carrierIDs: [ID64!]
        $countryCodes: [String!]
        $languageCodes: [String!]
    ) {
      result: createTrafficRouter(input: {
        title: $title,
        active: $active,
        description: $description,
        percent: $percent,
        secure: $secure,
        adBlock: $adBlock,
        privateBrowsing: $privateBrowsing,
        IP: $IP,
        RTBSourceIDs: $RTBSourceIDs
        applicationIDs:  $applicationIDs
        zoneIDs: $zoneIDs
        formatCodes: $formatCodes
        deviceTypeIDs: $deviceTypeIDs
        deviceIDs: $deviceIDs
        OSIDs: $OSIDs
        browserIDs: $browserIDs
        carrierIDs: $carrierIDs
        countryCodes: $countryCodes
        languageCodes: $languageCodes
      }) {
        clientMutationID
        object: router {
          ID
          description
        }
      }
    }
`;

export const gqlTrafficRoutersRunMutation = gql`
    mutation runTrafficRouter(
        $id: ID64!,
    ) {
        result: runTrafficRouter(ID: $id) {
            clientMutationID
            data: router {
                ID
                description
            }
        }
    }
`;

export const gqlTrafficRoutersPauseMutation = gql`
    mutation pauseTrafficRouter(
        $id: ID64!,
    ) {
        result: pauseTrafficRouter(ID: $id) {
            clientMutationID
            data: router {
                ID
                description
            }
        }
    }
`;

export const gqlTrafficRoutersDeleteMutation = gql`
    mutation pauseTrafficRouter(
        $id: ID64!,
    ) {
        result: deleteTrafficRouter(ID: $id) {
            clientMutationID
            data: router {
                ID
                description
            }
        }
    }
`;
