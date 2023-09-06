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

type Props = {
  colors: Colors
  contact: Member & { messages: Message[] }
  setContact: (contact: Member & { messages: Message[] }) => void
}

export default function MessagingMini ({ contact, colors, setContact }: Props) {
  const lastMessage = contact.messages[contact.messages.length - 1]
  const today = new Date().toDateString()
  const dateString =
    lastMessage.dateSent.getDay() +
    ' ' +
    lastMessage.dateSent.toLocaleString('default', { month: 'short' })
  const imageSource = (
    <Image
      style={styles.profilePicture}
      source={{ uri: contact.profileLocation }}
    />
  )

  return (
    <Pressable
      style={{
        ...styles.container,
        backgroundColor: colors.midColor,
        borderBottomColor: colors.darkColor
      }}
      onPress={() => setContact(contact)}
    >
      {imageSource}
      <View style={styles.dataHolder}>
        <View style={styles.usernameHolder}>
          <Text style={{ ...styles.username, color: colors.lightColor }}>
            {contact.username}
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
