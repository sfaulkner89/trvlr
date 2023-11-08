import { gql } from '@apollo/client'

export const DELETELIST = gql(`
    mutation deleteList ($userId: String!, $listId: String!) {
        deleteList(userId: $userId, listId: $listId) {
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
