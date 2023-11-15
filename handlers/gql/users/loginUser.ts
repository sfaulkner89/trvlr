import { gql } from '@apollo/client'

export const LOGINUSER = gql(`
    query loginUser ($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
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
