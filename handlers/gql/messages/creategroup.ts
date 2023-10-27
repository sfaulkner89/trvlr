import { gql } from '@apollo/client'

export const CREATE_GROUP = gql(`
    mutation createGroup ($members: [String!]!, $message: String, $name: String) {
        createGroup (members: $members, message: $message, name: $name) {
            id
        }
    }
`)
