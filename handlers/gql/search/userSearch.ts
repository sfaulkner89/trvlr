import { gql } from '@apollo/client'

export const USERSEARCH = gql(`
    query userSearch ($query: String!) {
        userSearch (query: $query) {
            id
            username
            displayName
            profileLocation
            countries
            following
            followers
            lists {
                id
                displayName
                location {
                    latitude
                    longitude
                }
                city
                country
                dateCreated
                dateModified
                places {
                    id
                    name
                    googlePlaceId
                    location {
                        latitude
                        longitude
                    }
                    city
                    country
                    dateCreated
                    dateModified
                    types
                }
            }
        }
    }
`)
