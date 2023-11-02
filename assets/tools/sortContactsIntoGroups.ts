import { Member } from '../../types/Member'

export type Group = {
  group: string
  users: Member[]
}

export default (contacts: Member[]): Group[] => {
  const groups: Group[] = []

  contacts.forEach(contact => {
    const group = contact.group

    if (groups.find(g => g.group === group)) {
      groups.find(g => g.group === group).users.push(contact)
    } else {
      groups.push({ group: group, users: [contact] })
    }
  })
  return groups
}
