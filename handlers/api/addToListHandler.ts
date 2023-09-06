import { LazyQueryExecFunction, MutationFunction } from '@apollo/client'
import placeUnshim from '../../assets/tools/placeUnshim'
import { List } from 'types/List'
import { PlaceDetails } from 'types/PlaceDetails'
import { PlaceToSend } from 'types/PlaceToSend'

export const addToListHandler = async (
  placeAdder: MutationFunction,
  placeToAdd: PlaceDetails,
  listToAddTo: List,
  setAddToList: (set: boolean) => void
) => {
  const placeToSend = placeUnshim([placeToAdd])
  const listId = placeAdder({
    variables: { listId: listToAddTo.id, place: placeToSend[0] }
  })
  setAddToList(false)
}
