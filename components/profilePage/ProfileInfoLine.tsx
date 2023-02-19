import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../types/colors'
import { Member } from '../../types/Member'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import { MessagingGroup } from '../../types/MessagingGroup'
import { Feather, SimpleLineIcons } from '@expo/vector-icons'

type Props = {
  colors: Colors
  profile: Member
  setChat: (active: MessagingGroup) => void
  messages: MessagingGroup
  isCurrentUser: boolean
}
const buttonSize = winWidth * 0.05

export default function ProfileInfoLine ({
  colors,
  profile,
  setChat,
  messages,
  isCurrentUser
}: Props) {
  return (
    <View style={{ ...styles.container }}>
      <Text style={{ ...styles.username, color: colors.lightColor }}>
        📍 Boston, US
      </Text>
      <Text style={{ ...styles.bio, color: colors.lightColor }}>
        {profile.bio}
      </Text>
      {!isCurrentUser ? (
        <View style={styles.buttonHolder}>
          <Pressable
            style={{ ...styles.button, borderColor: colors.lightColor }}
            onPress={() => setChat(messages)}
          >
            <Feather
              name='message-circle'
              size={buttonSize}
              color={colors.lightColor}
            />
            <Text style={{ ...styles.buttonText, color: colors.lightColor }}>
              Message
            </Text>
          </Pressable>

          <Pressable
            style={{ ...styles.button, borderColor: colors.lightColor }}
          >
            <SimpleLineIcons
              name='user-follow'
              size={buttonSize}
              color={colors.lightColor}
            />
            <Text style={{ ...styles.buttonText, color: colors.lightColor }}>
              Follow
            </Text>
          </Pressable>
        </View>
      ) : (
        <View />
      )}
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
  bio: {},
  buttonHolder: {
    flexDirection: 'row',
    marginBottom: winHeight * 0.01,
    marginTop: winHeight * 0.01,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: winWidth * 0.8
  },
  button: {
    width: winWidth * 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderWidth: winWidth * 0.005,
    borderRadius: winWidth * 0.03,
    padding: winWidth * 0.02
  },
  buttonText: {}
})
