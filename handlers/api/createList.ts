import { MutationFunction } from '@apollo/client'
import { Settings } from 'react-native'
import { PlaceDetails } from 'types/PlaceDetails'
import { Member } from '../../types/Member'

export default async (
  user: Member,
  listName: String,
  locale: String,
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
    initialPlace: {
      name: initialPlace.establishment.name,
      googlePlaceId: initialPlace.placeId,
      location: {
        latitude: initialPlace.location.latitude,
        longitude: initialPlace.location.longitude
      }
    }
  }
  console.log(createVariables)
  const newList = await createList({
    variables: createVariables
  }).catch(err => console.error(err))
}
