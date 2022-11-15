import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../types/colors'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import profileStats from '../../assets/variables/profileStats'
import StatHolder from './StatHolder'
import { Member } from '../../types/Member'

type Props = {
  colors: Colors
  profile: Member
}

export default function ProfileTopLine ({ profile, colors }: Props) {
  return (
    <View style={styles.container}>
      {profileStats.slice(0, 2).map((stat, i) => (
        <StatHolder stat={stat} profile={profile} key={i} colors={colors} />
      ))}

      <View style={{ ...styles.imageHolder }}>
        <Image
          source={profile.profilePicture}
          style={{ ...styles.profilePicture, borderColor: colors.lightColor }}
        />
      </View>
      {profileStats.slice(2).map((stat, i) => (
        <StatHolder stat={stat} profile={profile} key={i} colors={colors} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: winWidth * 0.9,
    flexDirection: 'row'
  },
  imageHolder: {
    marginLeft: winWidth * 0.04,
    marginRight: winWidth * 0.04
  },
  profilePicture: {
    width: winWidth * 0.25,
    height: winWidth * 0.25,
    borderRadius: winWidth * 0.2,
    borderWidth: 3
  }
})
