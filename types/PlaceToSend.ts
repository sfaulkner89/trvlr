import { LatLng } from 'react-native-maps'
import { PlaceComment } from './PlaceComment'
import { PlaceRating } from './PlaceRating'

export type PlaceToSend = {
  name: string
  googlePlaceId: string
  location: LatLng
  city: string
  country: string
}
