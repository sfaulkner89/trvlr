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
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setUser } from '../../redux/slices/userSlice'
import {
  setMessagingGroups,
  updateMessagingGroup
} from '../../redux/slices/messagingGroupSlice'
import { MessagingGroup } from '../../types/MessagingGroup'
import { POSTMESSAGE } from '../../handlers/gql/messages/postMessage'

type Props = {
  newChat: boolean
}

export default function ChatInput ({ newChat }: Props) {
  const [createGroup] = useMutation(CREATE_GROUP)
  const [postMessage] = useMutation<{
    postMessage: { id: string; messages: Message[] }
  }>(POSTMESSAGE)
  const user: Member = useAppSelector(store => store.user)
  const selectedMessagingGroup: MessagingGroup = useAppSelector(
    store => store.messagingGroups.selectedGroup
  )
  const colors = useAppSelector(store => store.colors)
  const dispatch = useAppDispatch()

  const [newMessage, setNewMessage] = useState<string>('')

  const sendHandler = async () => {
    if (!newMessage) return

    if (newChat) {
      const newGroup = await createGroup({
        variables: {
          from: user.id,
          to: [selectedMessagingGroup.members.map(m => m.id)],
          message: newMessage
        }
      })
      console.log('NG', newGroup.data.createGroup)
      dispatch(
        setMessagingGroups([...user.messagingGroups, newGroup.data.createGroup])
      )
    } else {
      console.log(user.id, selectedMessagingGroup.id, newMessage)
      const appendedGroup = await postMessage({
        variables: {
          groupId: selectedMessagingGroup.id,
          userId: user.id,
          message: newMessage
        }
      })

      const newMessageList = appendedGroup.data.postMessage

      dispatch(updateMessagingGroup(newMessageList))
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
