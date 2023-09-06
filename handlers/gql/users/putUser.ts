import { gql } from '@apollo/client'

export const PUT_USER = gql(`
    mutation putUser ($userId: String!, $checkInLocation: checkInLocation) {
        putUser(userId: $userId, checkInLocation: $checkInLocation) {
            id
        }    
    }
`)
