import { List } from './List'
import { MessagingGroup } from './MessagingGroup'
import { PlaceDetails } from './PlaceDetails'
import { PlaceSearchResult } from './PlaceSearchResult'

export type Member = {
  id: string
  username: string
  displayName: string
  bio: string
  profilePicture: ImageData
  profileLocation: string
  countries: string[]
  following: string[]
  followers: string[]
  checkInLocation: PlaceSearchResult
  lists: List[]
  group?: string
  admin?: boolean
}
