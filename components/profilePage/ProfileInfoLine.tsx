import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../types/colors'
import { Member } from '../../types/Member'
import { winHeight, winWidth } from '../../assets/variables/height-width'

type Props = {
  colors: Colors
  profile: Member
}

export default function ProfileInfoLine ({ colors, profile }: Props) {
  return (
    <View style={{ ...styles.container }}>
      <Text style={{ ...styles.username, color: colors.lightColor }}>
        📍 Boston, US
      </Text>
      <Text style={{ ...styles.bio, color: colors.lightColor }}>
        {profile.bio}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: winHeight * 0.01,

    minHeight: winHeight * 0.05,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  username: {},
  bio: {}
})
