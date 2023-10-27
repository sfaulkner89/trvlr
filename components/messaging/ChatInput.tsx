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
import uuid from 'react-native-uuid'
import { useMutation } from '@apollo/client'
import { CREATE_GROUP } from '../../handlers/gql/messages/creategroup'
import { useAppSelector } from '../../redux/hooks'

type Props = {
  colors: Colors
  currentUser: Member
  currentMessages: Message[]
  newChat: boolean
}

export default function ChatInput ({
  colors,
  newChat,
  currentMessages,
  currentUser
}: Props) {
  const [createGroup] = useMutation(CREATE_GROUP)
  const user = useAppSelector(store => store.user)
  const contact = useAppSelector(store => store.contact.selectedContact)

  const [newMessage, setNewMessage] = useState<string>('')

  const sendHandler = () => {
    if (!newMessage) return

    if (newChat) {
      createGroup({
        variables: {
          members: [user.id, contact.id],
          message: newMessage
        }
      })
    } else {
    }
    //setCurrentMessages([...currentMessages, messageToAdd])
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
