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

const winHeight = Dimensions.get('window').height
const winWidth = Dimensions.get('window').width

type Props = {
  colors: Colors
  currentUser: Member
}

export default function ContactScreen ({ colors, currentUser }: Props) {
  const [profilePage, setProfilePage] = useState(false)
  const [contact, setContact] = useState<Member | undefined>()

  const contacts: GroupInfo[] = useAppSelector(
    (state: RootState) => state.user.groups
  )

  return profilePage && contact ? (
    <ProfilePage
      colors={colors}
      profile={contact}
      setProfilePage={setProfilePage}
      isCurrentUser={false}
      currentUser={currentUser}
    />
  ) : (
    <View style={{ ...styles.container, backgroundColor: colors.darkColor }}>
      <ContactHeader colors={colors} title='Contacts' />
      <ScrollView>
        {contacts.map((group: GroupInfo, i: number) => {
          return (
            <GroupList
              group={group}
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
    alignItems: 'center'
  }
})
