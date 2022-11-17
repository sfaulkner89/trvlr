import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../types/colors'
import { Member } from '../../types/Member'
import { winHeight, winWidth } from '../../assets/variables/height-width'

type Props = {
  colors: Colors
  currentUser: Member
  message: Message
}

export default function MessageBubble ({
  colors,
  currentUser,
  message
}: Props) {
  const currentUserBoolean = message.userId === currentUser.id
  return (
    <View
      style={{
        ...styles.messageContainer,
        alignItems: currentUserBoolean ? 'flex-end' : 'flex-start'
      }}
    >
      <View
        style={{
          ...styles.bubble,
          backgroundColor: currentUserBoolean
            ? colors.lightColor
            : colors.selectedColor
        }}
      >
        <Text
          style={{
            ...styles.messageText,
            color: currentUserBoolean ? colors.darkColor : colors.lightColor
          }}
        >
          {message.text}
        </Text>
        <View style={styles.dateHolder}>
          <Text
            style={{
              ...styles.dateText,
              color: currentUserBoolean ? colors.darkColor : colors.lightColor
            }}
          >
            {message.dateSent.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  messageContainer: {
    flex: 1,
    maxHeight: winHeight * 0.06
  },
  bubble: {
    padding: winWidth * 0.02,
    borderRadius: winWidth * 0.03,
    maxWidth: winWidth * 0.6
  },
  messageText: {},
  dateHolder: {
    alignItems: 'flex-end'
  },
  dateText: {
    fontSize: winWidth * 0.025
  }
})
