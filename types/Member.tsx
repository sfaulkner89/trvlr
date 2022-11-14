import { List } from './List'

export type Member = {
  username: string
  handle: string
  profilePicture: ImageData
  countries: number
  worldCovered: number
  friends: number
  lists: List[]
}
