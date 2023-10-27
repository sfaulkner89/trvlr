import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../types/colors'
import { Member } from '../../types/Member'
import MessagingMini from './MessagingMini'
import ChatScreen from './ChatScreen'
import ChatListHeader from './ChatListHeader'
import { useAppSelector } from '../../redux/hooks'

const winHeight = Dimensions.get('window').height
const winWidth = Dimensions.get('window').width

type Props = {
  colors: Colors
  currentUser: Member
}

export default function ChatListPage ({ colors, currentUser }: Props) {
  const contact = useAppSelector(store => store.contact.selectedContact)

  const user = useAppSelector(store => store.user)

  return contact ? (
    <ChatScreen colors={colors} currentUser={currentUser} profile={contact} />
  ) : (
    <View style={{ ...styles.container, backgroundColor: colors.darkColor }}>
      <ChatListHeader colors={colors} />
      <ScrollView>
        {(user.groups || []).map(
          (group: { [key: string]: string }, i: number) => {
            return <MessagingMini colors={colors} contact={contact} key={i} />
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
