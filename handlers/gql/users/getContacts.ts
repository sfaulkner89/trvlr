import { gql } from '@apollo/client'

export const GETCONTACTS = gql(`
query getContacts ($userId: String!) {
    getContacts(userId: $userId) {
        contacts {
            id,
            username,
            displayName,
            profileLocation,
            countries {
                country,
                dateAdded
            },
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
            },
            group,
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
}
`)
