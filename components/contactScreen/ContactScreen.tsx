import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../types/colors'
import GroupList from './GroupList'
import ContactHeader from './ContactHeader'
import ProfilePage from '../profilePage/ProfilePage'
import { Member } from '../../types/Member'
import { useAppSelector } from '../../redux/hooks'
import { RootState } from '../../redux/store'
import { GroupInfo } from '../../types/GroupInfo'
import { GETUSERS } from '../../handlers/gql/users/getUsers'
import { useQuery } from '@apollo/client'
import MemberListItem from './MemberListItem'
import { GETCONTACTS } from '../../handlers/gql/users/getContacts'
import sortContactsIntoGroups, {
  Group
} from '../../assets/tools/sortContactsIntoGroups'
import capitalise from '../../assets/tools/capitalise'

const winHeight = Dimensions.get('window').height
const winWidth = Dimensions.get('window').width

type Props = {
  colors: Colors
  currentUser: Member
  setPage: (set: number) => void
}

export default function ContactScreen ({ colors, currentUser, setPage }: Props) {
  const [profilePage, setProfilePage] = useState(false)
  const [contact, setContact] = useState<Member | undefined>()

  const user = useAppSelector(state => state.user)

  const { data, refetch } = useQuery<{ getContacts: { contacts: Member[] } }>(
    GETCONTACTS,
    {
      variables: { userId: user.id }
    }
  )

  const contacts = data?.getContacts.contacts || []

  const contactGroups = sortContactsIntoGroups(contacts)

  return (
    <View style={{ ...styles.container, backgroundColor: colors.darkColor }}>
      <ContactHeader colors={colors} title='Contacts' />
      <ScrollView>
        {contactGroups.map((group: Group, i: number) => {
          return (
            <View>
              <Text style={{ ...styles.groupNameText }}>
                {capitalise(group.group)}
              </Text>
              {group.users.map((user: Member, i: number) => (
                <MemberListItem member={user} colors={colors} key={i} />
              ))}
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: winWidth
  },
  groupNameText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10
  }
})
