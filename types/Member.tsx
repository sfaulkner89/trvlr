import { List } from './List'

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
  lists: List[]
}
