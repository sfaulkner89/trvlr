import { gql } from '@apollo/client'

export const NEW_MESSAGES = gql(`
subscription newMessages($ids: [String]!) {
    newMessages(ids: $ids) {
        id,
        messages {
            message,
            to
        }
    }
}
`)
