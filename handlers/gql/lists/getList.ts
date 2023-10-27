import { gql } from '@apollo/client'

export const GETLIST = gql(`
    query getList ($id: String!) {
        getList(id: $id) {
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
`)
