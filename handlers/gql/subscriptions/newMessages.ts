import { gql } from '@apollo/client'

export const NEW_MESSAGES = gql(`
subscription newMessages($id: String) {
    newMessages(id: $id) {
        id,
        messages {
          to,
          from,
          message,
          dateCreated,
        },
        dateCreated,
        dateModified,
    }
}
`)
