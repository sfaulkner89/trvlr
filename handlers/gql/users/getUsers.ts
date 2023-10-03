import { gql } from '@apollo/client'

export const GETUSERS = gql(`
query getUsers ($ids: [String]!) {
    getUsers(ids: $ids) {
        id,
        username,
        displayName,
        profileLocation,
        countries,
        following,
        followers,
        checkInLocation {
            names {
                main_text,
                secondary_text
            }
            location {
                latitude,
                longitude
            }
        }
        lists {
            id,
            displayName,
            location {
                latitude,
                longitude,
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
                }
                city,
                country,
                dateCreated,
                dateModified,
                types
            }
        }
    }
}
`)
