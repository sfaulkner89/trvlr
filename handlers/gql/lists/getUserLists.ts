import { gql } from '@apollo/client'

export const GETUSERLISTS = gql(`
    query getUser ($id: String!) {
        getUser(id: $id) {
            lists {
                id,
                displayName,
                photoLocation,
                location {
                    latitude,
                    longitude
                },
                city,
                country,
                dateCreated,
                dateModified,
                places {
                    id,
                    name,
                    googlePlaceId,
                    location {
                        latitude,
                        longitude
                    },
                    city,
                    country,
                    dateCreated,
                    dateModified,
                    ratings {
                        stars
                    },
                    comments {
                        text
                    }
                }
            }
        }
    }
`)
