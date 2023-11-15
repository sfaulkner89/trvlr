import { gql } from '@apollo/client'

export const GETUSER = gql(`
    query getUser ($id: String!) {
        getUser(id: $id) {
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
            contactIds {
                id,
                group
            },
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
