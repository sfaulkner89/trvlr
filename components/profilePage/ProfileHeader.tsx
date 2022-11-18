import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../types/colors'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import { default as AnIcon } from 'react-native-vector-icons/AntDesign'
import { default as FaIcon } from 'react-native-vector-icons/FontAwesome5'
import { default as EnIcon } from 'react-native-vector-icons/Entypo'
import { default as FeIcon } from 'react-native-vector-icons/Feather'
import { default as SiIcon } from 'react-native-vector-icons/SimpleLineIcons'
import { Member } from '../../types/Member'
import { List } from '../../types/List'

type Props = {
  colors: Colors
  profile: Member
  setProfilePage: (active: boolean) => void
  setSelection: (member: Member) => void
  currentUser: boolean
}

const buttonSize = winWidth * 0.05

export default function ProfileHeader ({
  colors,
  profile,
  setProfilePage,
  setSelection,
  currentUser
}: Props) {
  return (
    <View style={styles.container}>
      {setProfilePage ? (
        <View
          style={{
            ...styles.buttonHolder,
            justifyContent: currentUser ? 'flex-end' : 'center'
          }}
        >
          <Pressable
            style={styles.button}
            onPress={() => setProfilePage(false)}
          >
            <AnIcon name='left' size={buttonSize} color={colors.lightColor} />
          </Pressable>
        </View>
      ) : (
        <View style={styles.buttonHolder} />
      )}

      <Text style={{ ...styles.handle, color: colors.lightColor }}>
        {profile.name}
      </Text>
      <View
        style={{
          ...styles.buttonHolder,
          justifyContent: currentUser ? 'flex-end' : 'center'
        }}
      >
        {!currentUser ? (
          <React.Fragment>
            <Pressable style={styles.button}>
              <FeIcon
                name='message-circle'
                size={buttonSize}
                color={colors.lightColor}
              />
            </Pressable>

            <Pressable style={styles.button}>
              <SiIcon
                name='user-follow'
                size={buttonSize}
                color={colors.lightColor}
              />
            </Pressable>
          </React.Fragment>
        ) : (
          <View />
        )}
        <Pressable
          style={{
            ...styles.button,
            alignItems: currentUser ? 'flex-end' : 'center'
          }}
        >
          <EnIcon
            name='dots-three-horizontal'
            size={buttonSize}
            color={colors.lightColor}
            onPress={() => setSelection(profile)}
          />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: winHeight * 0.09,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: winHeight * 0.02,
    flexDirection: 'row',
    width: winWidth
  },
  handle: {
    marginTop: winHeight * 0.01,
    fontSize: winWidth * 0.035,
    fontWeight: 'bold',
    textAlign: 'center',
    width: winWidth * 0.6,
    maxWidth: winWidth * 0.6
  },
  button: {
    alignItems: 'center',
    marginRight: winWidth * 0.025
  },
  buttonHolder: {
    flexDirection: 'row',
    flex: 1,
    marginRight: winWidth * 0.02
  }
})
