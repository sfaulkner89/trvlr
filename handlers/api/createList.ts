import { FetchResult, MutationFunction, MutationResult } from '@apollo/client'
import { Settings } from 'react-native'
import { List } from 'types/List'
import { PlaceDetails } from 'types/PlaceDetails'
import { Member } from '../../types/Member'

export default async (
  user: Member,
  listName: String,
  initialPlace: PlaceDetails | undefined,
  createList: MutationFunction
) => {
  const createVariables = {
    userId: user.id,
    displayName: listName,
    location: initialPlace
      ? {
          latitude: initialPlace.location.latitude,
          longitude: initialPlace.location.longitude
        }
      : undefined,
    initialPlace: initialPlace
      ? {
          name: initialPlace.name,
          address: initialPlace.address,
          googlePlaceId: initialPlace.placeId,
          types: initialPlace.establishment.types,
          note: initialPlace.note,
          rating: initialPlace.establishment.rating,
          price: initialPlace.establishment.price,
          location: {
            latitude: initialPlace.location.latitude,
            longitude: initialPlace.location.longitude
          }
        }
      : null
  }
  const newList: List = await createList({
    variables: createVariables
  })
    .then(res => res.data.createList)
    .catch(err => console.error(err))
  return newList
}
