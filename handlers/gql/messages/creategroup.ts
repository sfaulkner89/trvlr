import { gql } from '@apollo/client'

export const CREATE_GROUP = gql(`
    mutation createGroup ($from: String!, $to: [String]!, $message: String, $name: String) {
        createGroup (from: $from, to: $to, message: $message, name: $name) {
            id,
            name,
            group,
            members {
                id,
                username,
                displayName,
                profileLocation,
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
            },
            messages {
                to,
                from,
                message,
                dateCreated
            },
            dateCreated,
            dateModified
        }
    }
`)
