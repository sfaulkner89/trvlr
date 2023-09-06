import { LatLng } from 'react-native-maps'
import { Location } from './Location'
import { Place } from './Place'
import { PlaceDetails } from './PlaceDetails'

export type List = {
  id?: string
  displayName: string
  photo?: ImageData
  location?: LatLng
  city?: string
  country?: string
  dateCreated: Date
  dateModified: Date
  places: PlaceDetails[]
}
