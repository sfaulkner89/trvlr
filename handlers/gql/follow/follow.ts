import { gql } from '@apollo/client'

export const FOLLOW = gql(`
    mutation follow ($userId: String!, $followId: String!) {
        follow (userId: $userId, followId: $followId) {
            followers
        }
    }
`)
