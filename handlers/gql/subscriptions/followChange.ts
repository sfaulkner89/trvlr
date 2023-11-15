import { gql } from '@apollo/client'

export const FOLLOW_CHANGE = gql(`
subscription followChange($id: String) {
    followChange(id: $id) {
        from {
            id,
            username,
            displayName,
            profileLocation
        },
         to {
            id,
            username,
            displayName,
            profileLocation
        },
        follow
    }
}
`)
