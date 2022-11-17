import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../types/colors'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import { default as AnIcon } from 'react-native-vector-icons/AntDesign'
import { default as FaIcon } from 'react-native-vector-icons/FontAwesome5'
import { default as EnIcon } from 'react-native-vector-icons/Entypo'
import { Member } from '../../types/Member'
import { List } from '../../types/List'
import { MessagingGroup } from '../../types/MessagingGroup'

type Props = {
  colors: Colors
  chat: MessagingGroup
  setChat: (chat?: undefined) => void
  contacts: Member[]
}

const buttonSize = winWidth * 0.05

export default function ChatHeader ({
  colors,
  chat,
  setChat,
  contacts
}: Props) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => setChat()}>
        <AnIcon name='left' size={buttonSize} color={colors.lightColor} />
      </Pressable>
      <Text style={{ ...styles.handle, color: colors.lightColor }}>
        {chat.group
          ? chat.group.groupName
          : contacts.length > 1
          ? `${contacts.length} Contacts`
          : contacts[0].username}
      </Text>
      <Pressable style={styles.button}>
        <EnIcon
          name='dots-three-horizontal'
          size={buttonSize}
          color={colors.lightColor}
        />
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
