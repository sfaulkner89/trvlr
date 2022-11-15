import { LatLng } from 'react-native-maps'
import { Location } from './Location'

export type Place = {
  name: string
  placeType: string
  location: LatLng
  dateCreated: Date
  dateModified: Date
  notes: string
}
