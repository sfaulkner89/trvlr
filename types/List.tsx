import { Location } from './Location'
import { Place } from './Place'

export type List = {
  name: string
  location: Location
  dateCreated: Date
  dateModified: Date
  places: Place[]
}
