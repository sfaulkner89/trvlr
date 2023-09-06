import { gql } from '@apollo/client'

export const ADDPLACETOLIST = gql(`
    mutation addPlaceToList ($listId: String!, $place: PlaceToAdd) {
        addPlaceToList (listId: $listId, place: $place) {
            id
        }
    }
`)
