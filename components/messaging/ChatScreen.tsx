import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../types/colors'
import { MessagingGroup } from '../../types/MessagingGroup'
import ChatInput from './ChatInput'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import ChatHeader from './ChatHeader'
import { Member } from 'types/Member'
import MessageBubble from './MessageBubble'
import { useAppSelector } from '../../redux/hooks'

type Props = {}

export default function ChatScreen ({}: Props) {
  const contact = useAppSelector(store => store.contact.selectedContact)
  const user = useAppSelector(store => store.user)
  const colors = useAppSelector(store => store.colors)
  const selectedMessagingGroup: MessagingGroup = useAppSelector(
    store => store.messagingGroups.selectedGroup
  )

  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd()
    }, 100)
  }, [selectedMessagingGroup.messages.length])

  Keyboard.addListener('keyboardDidShow', () => {
    scrollRef.current?.scrollToEnd({ animated: true })
  })

  const scrollRef = React.useRef(null)

  const newChat = selectedMessagingGroup.messages.length === 0

  return (
    <KeyboardAvoidingView
      behavior='padding'
      style={{ ...styles.container, backgroundColor: colors.midColor }}
    >
      <ChatHeader />
      <View style={{ ...styles.messagesHolder }}>
        <ScrollView ref={scrollRef}>
          {(selectedMessagingGroup?.messages || []).map((message, i) => {
            return (
              <MessageBubble
                key={i}
                colors={colors}
                currentUser={user}
                message={message}
              />
            )
          })}
        </ScrollView>
      </View>
      <ChatInput newChat={newChat} />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  messagesHolder: {
    flex: 1,
    // height: winHeight * 0.8,
    width: winWidth * 0.98,
    justifyContent: 'flex-start'
  },
  messageContainer: {
    flex: 1,
    maxHeight: winHeight * 0.05
  },
  bubble: {
    padding: winWidth * 0.02,
    borderRadius: winWidth * 0.03,
    maxWidth: winWidth * 0.6
  },
  messageText: {}
})
