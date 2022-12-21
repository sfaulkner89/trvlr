import { Member } from './Member'

export type GroupInfo = {
  groupName: string
  groupPicture?: ImageData
  members: string[]
  memberProfiles: Member[]
}
