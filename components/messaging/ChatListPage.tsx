import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../types/colors'
import { Member } from '../../types/Member'
import MessagingMini from './MessagingMini'
import ChatScreen from './ChatScreen'
import ChatListHeader from './ChatListHeader'
import { useAppSelector } from '../../redux/hooks'
import { MessagingGroup } from '../../types/MessagingGroup'

const winHeight = Dimensions.get('window').height
const winWidth = Dimensions.get('window').width

type Props = {
  colors: Colors
  currentUser: Member
}

export default function ChatListPage ({ colors, currentUser }: Props) {
  const contact = useAppSelector(store => store.contact.selectedContact)
  const selectedMessagingGroup = useAppSelector(
    store => store.messagingGroups.selectedGroup
  )
  const messagingGroups = useAppSelector(store => store.messagingGroups.groups)

  const user = useAppSelector(store => store.user)

  console.log('MG', messagingGroups)

  return selectedMessagingGroup ? (
    <ChatScreen />
  ) : (
    <View style={{ ...styles.container, backgroundColor: colors.darkColor }}>
      <ChatListHeader colors={colors} />
      <ScrollView>
        {(user.messagingGroups || []).map(
          (messagingGroup: MessagingGroup, i: number) => {
            return <MessagingMini key={i} messagingGroup={messagingGroup} />
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
