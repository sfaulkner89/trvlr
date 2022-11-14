import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../types/colors'
import { winHeight, winWidth } from '../../assets/height-width'
import { default as AnIcon } from 'react-native-vector-icons/AntDesign'
import { default as FaIcon } from 'react-native-vector-icons/FontAwesome5'
import { Member } from '../../types/Member'
import { List } from '../../types/List'

type Props = {
  colors: Colors
  profile: Member | List
  setProfilePage: (active: boolean) => void
  icon: string
}

const buttonSize = winWidth * 0.05

export default function ProfileHeader ({
  colors,
  profile,
  setProfilePage,
  icon
}: Props) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => setProfilePage(false)}>
        <AnIcon name='left' size={buttonSize} color={colors.lightColor} />
      </Pressable>

      <Text style={{ ...styles.handle, color: colors.lightColor }}>
        {profile.name}
      </Text>
      <Pressable style={styles.button}>
        <FaIcon name={icon} size={buttonSize} color={colors.lightColor} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: winHeight * 0.09,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: winHeight * 0.02,
    flexDirection: 'row'
  },
  handle: {
    marginTop: winHeight * 0.01,
    fontSize: winWidth * 0.035,
    fontWeight: 'bold',
    width: winWidth * 0.76,
    textAlign: 'center'
  },
  button: {
    width: winWidth * 0.12,
    alignItems: 'center'
  }
})
