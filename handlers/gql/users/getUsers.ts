import { gql } from '@apollo/client'

export const GETUSERS = gql(`
    query getUsers ($ids: Array) {
        getUsers(ids: $ids) {
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
