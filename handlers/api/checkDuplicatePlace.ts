import { gql } from '@apollo/client'

export const CHECKDUPLICATEPLACE = gql(`
    query checkDuplicatePlace ($listId: String!, $place: NewPlaceToCheck) {
        checkDuplicatePlace(listId: $listId, place: $place)
}`)
