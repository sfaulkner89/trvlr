import { gql } from '@apollo/client'

export const POSTMESSAGE = gql(`
    mutation postMessage ($groupId: String!, $userId: String! $message: String!) {
        postMessage (groupId: $groupId, userId: $userId, message: $message) {
            id,
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
