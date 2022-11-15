import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../types/colors'
import groupData from '../../assets/data/groupdata'
import GroupList from './GroupList'
import ContactHeader from './ContactHeader'
import ProfilePage from '../profilePage/ProfilePage'
import { Member } from '../../types/Member'

const winHeight = Dimensions.get('window').height
const winWidth = Dimensions.get('window').width

type Props = {
  colors: Colors
}

export default function ContactScreen ({ colors }: Props) {
  const [profilePage, setProfilePage] = useState(false)
  const [contact, setContact] = useState<Member | undefined>()

  return profilePage && contact ? (
    <ProfilePage
      colors={colors}
      profile={contact}
      setProfilePage={setProfilePage}
    />
  ) : (
    <View style={{ ...styles.container, backgroundColor: colors.darkColor }}>
      <ContactHeader colors={colors} />
      <ScrollView>
        {groupData.map((group, i) => {
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
