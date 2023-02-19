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
                photo
                location
                city
                country
                dateCreated
                dateModified
                places {
                    placeId
                name
                location: {
                    latitude
                    longitude
                    locale
                    area
                }
                establishment: {
                    price
                    rating
                    types
                }
            }
        }
    }
`)
