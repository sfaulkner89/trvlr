import { gql } from '@apollo/client'

export const ADDPLACETOLIST = gql(`
    mutation addPlaceToList ($listId: String!, $userId: String!, $place: PlaceToAdd) {
        addPlaceToList (listId: $listId, userId: $userId, place: $place) {
            id
        }
    }
`)
