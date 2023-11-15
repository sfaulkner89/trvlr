import { gql } from '@apollo/client'

export const CREATELIST = gql(`
    mutation createList ($userId: String!, $displayName: String!, $location: LatLngInput, $initialPlace: InitialPlace) {
        createList (userId: $userId, displayName: $displayName, location: $location, initialPlace: $initialPlace) {
            id
            places {
                id
                name
                address
                googlePlaceId
                location {
                  latitude
                  longitude
                }
                city
                country
                ratings {
                  stars
                }
                comments {
                  text
                }
                types
            }
        }
    }
`)
