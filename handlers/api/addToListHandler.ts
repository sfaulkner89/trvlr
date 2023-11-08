import { LazyQueryExecFunction, MutationFunction } from '@apollo/client'
import placeUnshim from '../../assets/tools/placeUnshim'
import { List } from 'types/List'
import { PlaceDetails } from 'types/PlaceDetails'
import { PlaceToSend } from 'types/PlaceToSend'

export const addToListHandler = async (
  placeAdder: MutationFunction,
  placeToAdd: PlaceDetails,
  listToAddTo: List
) => {}
