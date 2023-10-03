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

  const { data, refetch } = useQuery<{ getUsers: Member[] }>(GETUSERS, {
    variables: { ids: currentUser.following }
  })

  const contacts = data?.getUsers || []

  return profilePage && contact ? (
    <ProfilePage
      colors={colors}
      member={contact}
      setProfilePage={setProfilePage}
      isCurrentUser={false}
      currentUser={currentUser}
      setPage={setPage}
    />
  ) : (
    <View style={{ ...styles.container, backgroundColor: colors.darkColor }}>
      <ContactHeader colors={colors} title='Contacts' />
      <ScrollView>
        {contacts.map((group: Member, i: number) => {
          return (
            <MemberListItem
              member={group}
              colors={colors}
              key={i}
              setContact={setContact}
              setProfilePage={setProfilePage}
            />
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
  }
})
