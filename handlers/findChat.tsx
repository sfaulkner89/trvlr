import { Member } from '../types/Member'
import { MessagingGroup } from '../types/MessagingGroup'
import 'react-native-get-random-values'
import uuid from 'react-native-uuid'

export const findChat = (
  profile: Member,
  currentMessages: MessagingGroup[]
) => {
  const chat = currentMessages.filter(
    (a: MessagingGroup) =>
      a.contacts[0] === profile.id && a.contacts.length === 1
  )
  return chat.length > 0
    ? chat[0]
    : {
        id: uuid.v4(),
        contacts: [profile.id],
        messages: []
      }
}
