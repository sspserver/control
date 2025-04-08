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
                applications
                formats
                deviceTypes
                devices
                OS
                browsers
                carriers
                countries
                languages
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
            list {
                ID
                active
                description
                title
                browsers
                formats
                percent
                privateBrowsing
                secure
                updatedAt
                RTBSources: RTBSources {
                    ID
                    title
                    active
                }
                applications
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
        $applications: [ID64!]
        $zones: [ID64!]
        $formats: [String!]
        $deviceTypes: [Int64!]
        $devices: [Int64!]
        $OS: [Int64!]
        $browsers: [Int64!]
        $carriers: [Int64!]
        $countries: [String!]
        $languages: [String!]
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
            applications:  $applications
            zones: $zones
            formats: $formats
            deviceTypes: $deviceTypes
            devices: $devices
            OS: $OS
            browsers: $browsers
            carriers: $carriers
            countries: $countries
            languages: $languages
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
        $applications: [ID64!]
        $zones: [ID64!]
        $formats: [String!]
        $deviceTypes: [Int64!]
        $devices: [Int64!]
        $OS: [Int64!]
        $browsers: [Int64!]
        $carriers: [Int64!]
        $countries: [String!]
        $languages: [String!]
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
        applications:  $applications
        zones: $zones
        formats: $formats
        deviceTypes: $deviceTypes
        devices: $devices
        OS: $OS
        browsers: $browsers
        carriers: $carriers
        countries: $countries
        languages: $languages
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
