import { Location } from './Location'
import { Place } from './Place'

export type List = {
  name: string
  photo?: ImageData
  location: Location
  city: string
  country: string
  dateCreated: Date
  dateModified: Date
  places: Place[]
}
