import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Colors } from '../../types/colors'
import { winWidth } from '../../assets/variables/height-width'
import profileStats from '../../assets/variables/profileStats'
import StatHolder from './StatHolder'
import { Member } from '../../types/Member'
import CachedImage from 'react-native-expo-cached-image'

type Props = {
  colors: Colors
  profile: Member
}

export default function ProfileTopLine ({ profile, colors }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.statHolderHolder}>
        {profileStats.slice(0, 2).map((stat, i) => (
          <StatHolder stat={stat} profile={profile} key={i} colors={colors} />
        ))}
      </View>

      <View style={{ ...styles.imageHolder }}>
        <CachedImage
          source={{ uri: profile.profileLocation }}
          style={{ ...styles.profilePicture, borderColor: colors.lightColor }}
        />
      </View>
      <View style={styles.statHolderHolder}>
        {profileStats.slice(2).map((stat, i) => (
          <StatHolder stat={stat} profile={profile} key={i} colors={colors} />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: winWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageHolder: {
    flex: 1,
    alignItems: 'center'
  },
  profilePicture: {
    width: winWidth * 0.18,
    height: winWidth * 0.18,
    borderRadius: winWidth * 0.2,
    borderWidth: 3
  },
  statHolderHolder: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  }
})
