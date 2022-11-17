import { List } from './List'

export type Member = {
  id: string
  username: string
  name: string
  profilePicture: ImageData
  countries: number
  worldCovered: number
  friends: number
  lists: List[]
}
