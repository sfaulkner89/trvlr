import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../types/colors'
import { Member } from '../../types/Member'
import MessagingMini from './MessagingMini'
import currentMessages from '../../assets/data/currentMessages'
import { MessagingGroup } from '../../types/MessagingGroup'
import ChatScreen from './ChatScreen'
import ChatListHeader from './ChatListHeader'

const winHeight = Dimensions.get('window').height
const winWidth = Dimensions.get('window').width

type Props = {
  colors: Colors
  currentUser: Member
  setMessages: (messageState: boolean) => void
}

export default function ChatListPage ({
  colors,
  currentUser,
  setMessages
}: Props) {
  const [chat, setChat] = useState<MessagingGroup | undefined>()
  return chat ? (
    <ChatScreen
      colors={colors}
      chat={chat}
      setChat={setChat}
      currentUser={currentUser}
    />
  ) : (
    <View style={{ ...styles.container, backgroundColor: colors.darkColor }}>
      <ChatListHeader colors={colors} setMessages={setMessages} />
      <ScrollView>
        {currentMessages.map((chat, i) => {
          return (
            <MessagingMini
              colors={colors}
              chat={chat}
              setChat={setChat}
              key={i}
            />
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: winWidth,
    height: winHeight,
    alignItems: 'center'
  }
})
