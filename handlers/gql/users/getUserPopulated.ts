import { gql } from '@apollo/client'

export const GETUSERPOPULATED = gql(` 
    query getUser ($id: String!, $populated: Boolean) {
        getUser(id: $id, populated: $populated) {
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
            messagingGroups {
                id,
                name,
                group,
                members {
                    id,
                    username,
                    displayName,
                    profileLocation,
                    countries {
                        country,
                        dateAdded
                    },
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
                }
                messages {
                    to,
                    from,
                    message,
                    dateCreated
                },
                dateCreated,
                dateModified
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
