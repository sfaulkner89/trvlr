import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../types/colors'
import { MessagingGroup } from '../../types/MessagingGroup'
import ChatInput from './ChatInput'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import ChatHeader from './ChatHeader'
import { contacts } from '../../assets/data/groupdata'
import { Member } from '../../types/Member'
import MessageBubble from './MessageBubble'

type Props = {
  colors: Colors
  chat: MessagingGroup
  setChat: (chat: undefined) => void
  currentUser: Member
}

export default function ChatScreen ({
  colors,
  chat,
  setChat,
  currentUser
}: Props) {
  const [currentMessages, setCurrentMessages] = useState<Message[]>(
    chat.messages
  )
  const chatContacts = chat.contacts.map(id => contacts[id])
  return (
    <KeyboardAvoidingView
      behavior='padding'
      style={{ ...styles.container, backgroundColor: colors.midColor }}
    >
      <ChatHeader
        colors={colors}
        chat={chat}
        setChat={setChat}
        contacts={chatContacts}
      />
      <ScrollView contentContainerStyle={{ ...styles.messagesHolder }}>
        {currentMessages.map((message, i) => {
          return (
            <MessageBubble
              key={i}
              colors={colors}
              currentUser={currentUser}
              message={message}
            />
          )
        })}
      </ScrollView>
      <ChatInput
        colors={colors}
        setCurrentMessages={setCurrentMessages}
        currentMessages={currentMessages}
        currentUser={currentUser}
      />
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
