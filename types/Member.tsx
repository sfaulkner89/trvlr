import { List } from './List'

export type Member = {
  id: string
  username: string
  displayName: string
  bio: string
  profilePicture: ImageData
  countries: number
  following: number
  followers: number
  lists: List[]
}
