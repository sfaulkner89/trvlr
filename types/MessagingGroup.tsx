import { GroupInfo } from './GroupInfo'
import { Member } from './Member'

export type MessagingGroup = {
  id: string
  group?: GroupInfo
  members: Member[]
  messages: Message[]
  dateCreated: string
  dateModified: string
}
