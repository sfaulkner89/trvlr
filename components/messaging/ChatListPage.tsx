import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../types/colors'
import { Member } from '../../types/Member'
import MessagingMini from './MessagingMini'
import currentMessages from '../../assets/data/currentMessages'
import { MessagingGroup } from '../../types/MessagingGroup'
import ChatScreen from './ChatScreen'
import ChatListHeader from './ChatListHeader'
import { useAppSelector } from '../../redux/hooks'

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
  const [contact, setContact] = useState<
    (Member & { messages: Message[] }) | undefined
  >()
  const contacts = useAppSelector(store => store.contact)

  return contact ? (
    <ChatScreen colors={colors} currentUser={currentUser} profile={contact} />
  ) : (
    <View style={{ ...styles.container, backgroundColor: colors.darkColor }}>
      <ChatListHeader colors={colors} setMessages={setMessages} />
      <ScrollView>
        {contacts.map(
          (contact: Member & { messages: Message[] }, i: number) => {
            return (
              <MessagingMini
                colors={colors}
                contact={contact}
                setContact={setContact}
                key={i}
              />
            )
          }
        )}
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
