import { LatLng } from 'react-native-maps'
import { Location } from './Location'
import { Place } from './Place'

export type List = {
  name: string
  photo?: ImageData
  location: LatLng
  city: string
  country: string
  dateCreated: Date
  dateModified: Date
  places: Place[]
}
