import { Location } from './Location'

export type Place = {
  name: string
  placeType: string
  location: Location
  dateCreated: Date
  dateModified: Date
  notes: string
}
