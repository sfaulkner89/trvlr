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
import { Member } from 'types/Member'
import MessageBubble from './MessageBubble'
import { useAppSelector } from '../../redux/hooks'

type Props = {
  colors: Colors
  currentUser: Member
  profile: Member
}

export default function ChatScreen ({ colors, currentUser, profile }: Props) {
  const contact = useAppSelector(store => store.contact.selectedContact)
  const user = useAppSelector(store => store.user)

  const groupChat = user.groups.find(group =>
    group.members.includes(contact.id)
  )

  let currentMessages

  const [newChat, setNewChat] = useState<boolean>(!groupChat)

  return (
    <KeyboardAvoidingView
      behavior='padding'
      style={{ ...styles.container, backgroundColor: colors.midColor }}
    >
      <ChatHeader colors={colors} profile={profile} />
      <ScrollView contentContainerStyle={{ ...styles.messagesHolder }}>
        {(currentMessages || []).map((message, i) => {
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
