import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../types/colors'
import Selector from '../search/Selector'
import profileButton from '../../assets/profileButton'
import ProfileMap from './ProfileMap'
import ProfileTopLine from './ProfileTopLine'
import ProfileHeader from './ProfileHeader'
import { Member } from '../../types/Member'

const winHeight = Dimensions.get('window').height
const winWidth = Dimensions.get('window').width
const size = winWidth * 0.06

type Props = {
  colors: Colors
  profile: Member
  setProfilePage: (active: boolean) => void
}

export default function ProfilePage ({
  colors,
  profile,
  setProfilePage
}: Props) {
  const [selection, setSelection] = useState(0)

  const buttonMap = [<ProfileMap />, <View />, <View />]

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: colors.darkColor
      }}
    >
      <ProfileHeader
        colors={colors}
        profile={profile}
        setProfilePage={setProfilePage}
      />
      <ProfileTopLine colors={colors} profile={profile} />
      <Text style={{ ...styles.username, color: colors.lightColor }}>
        {profile.username}
      </Text>

      <Selector
        colors={colors}
        buttonList={profileButton}
        selection={selection}
        setSelection={setSelection}
      />
      <View style={styles.selectionHolder}>{buttonMap[selection]}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: winHeight,
    width: winWidth,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  username: {
    fontSize: winWidth * 0.04,
    marginTop: winHeight * 0.02,
    marginBottom: winHeight * 0.01
  },

  selectionHolder: {
    height: winHeight * 0.5,
    width: winWidth,
    marginTop: winHeight * 0.02
  }
})
