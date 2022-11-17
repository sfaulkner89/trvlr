import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import React, { useState } from 'react'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import { Colors } from '../../types/colors'
import { Member } from '../../types/Member'
import 'react-native-get-random-values'
import { v4 } from 'uuid'

type Props = {
  colors: Colors
  setCurrentMessages: (newMessage: Message[]) => void
  currentUser: Member
  currentMessages: Message[]
}

export default function ChatInput ({
  colors,
  setCurrentMessages,
  currentMessages,
  currentUser
}: Props) {
  const [newMessage, setNewMessage] = useState<string>('')

  const sendHandler = () => {
    const messageToAdd: Message = {
      id: v4(),
      userId: currentUser.id,
      dateSent: new Date(),
      text: newMessage
    }
    setCurrentMessages([...currentMessages, messageToAdd])
    setNewMessage('')
  }
  return (
    <View style={{ ...styles.container, backgroundColor: colors.darkColor }}>
      <TextInput
        style={{ ...styles.input, backgroundColor: colors.midColor }}
        value={newMessage}
        onChangeText={e => setNewMessage(e)}
      />
      <Pressable
        style={{ ...styles.button, backgroundColor: colors.selectedColor }}
        onPress={sendHandler}
      >
        <Text style={{ ...styles.buttonText, color: colors.lightColor }}>
          Send
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: winHeight * 0.08,
    width: winWidth,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  input: {
    width: winWidth * 0.7,
    height: winHeight * 0.03,
    borderRadius: winWidth * 0.03,
    paddingLeft: winWidth * 0.02
  },
  button: {
    padding: winWidth * 0.015,
    margin: winWidth * 0.03,
    borderRadius: winWidth * 0.04
  },
  buttonText: {}
})
