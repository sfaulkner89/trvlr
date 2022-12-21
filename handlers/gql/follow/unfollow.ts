import { gql } from '@apollo/client'

export const UNFOLLOW = gql(`
    mutation unfollow ($userId: String!, $followId: String!) {
        unfollow (userId: $userId, followId: $followId) {
            username
        }
    }
`)
