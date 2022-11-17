import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable
} from 'react-native'
import React from 'react'
import { Colors } from '../../types/colors'
import { MessagingGroup } from '../../types/MessagingGroup'
import ImageGroup from './ImageGroup'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import { Member } from '../../types/Member'
import { contacts } from '../../assets/data/groupdata'

type Props = {
  colors: Colors
  chat: MessagingGroup
  setChat: (contact: MessagingGroup) => void
}

export default function MessagingMini ({ chat, colors, setChat }: Props) {
  const lastMessage = chat.messages[chat.messages.length - 1]
  console.log(lastMessage)
  const today = new Date().toDateString()
  const dateString =
    lastMessage.dateSent.getDay() +
    ' ' +
    lastMessage.dateSent.toLocaleString('default', { month: 'short' })
  const imageSource =
    chat.group && chat.group.groupPicture ? (
      <Image style={styles.profilePicture} source={chat.group.groupPicture} />
    ) : chat.contacts.length > 1 ? (
      <ImageGroup />
    ) : (
      <Image
        style={styles.profilePicture}
        source={contacts[chat.contacts[0]].profilePicture}
      />
    )
  return (
    <Pressable
      style={{
        ...styles.container,
        backgroundColor: colors.midColor,
        borderBottomColor: colors.darkColor
      }}
      onPress={() => setChat(chat)}
    >
      {imageSource}
      <View style={styles.dataHolder}>
        <View style={styles.usernameHolder}>
          <Text style={{ ...styles.username, color: colors.lightColor }}>
            {chat.group
              ? chat.group.groupName
              : chat.contacts.length > 1
              ? `${chat.contacts.length} Contacts`
              : contacts[chat.contacts[0]].username}
          </Text>
        </View>
        <View style={styles.handleHolder}>
          <Text style={{ ...styles.handle, color: colors.lightColor }}>
            {today === lastMessage.dateSent.toDateString()
              ? lastMessage.dateSent.getHours() + ': ' + lastMessage.text
              : dateString + ': ' + lastMessage.text}
          </Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 0.08 * winHeight,
    width: winWidth,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1
  },
  profilePicture: {
    width: 0.13 * winWidth,
    aspectRatio: 1,
    marginLeft: winWidth * 0.02
  },
  dataHolder: {
    flexDirection: 'column',
    marginLeft: winWidth * 0.03
  },
  username: {
    fontWeight: 'bold'
  },
  usernameHolder: {},
  handleHolder: {},
  handle: {}
})
