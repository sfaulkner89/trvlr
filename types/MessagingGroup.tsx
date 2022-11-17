import { GroupInfo } from './GroupInfo'
import { Member } from './Member'

export type MessagingGroup = {
  id: string
  group?: GroupInfo
  contacts: string[]
  messages: Message[]
}
