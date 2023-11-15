import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../types/colors'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { Member } from '../../types/Member'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { clearContact, setContact } from '../../redux/slices/contactSlice'
import { hideChatPage } from '../../redux/slices/messageSlice'
import { selectMessagingGroup } from '../../redux/slices/messagingGroupSlice'
import { MessagingGroup } from '../../types/MessagingGroup'
import CachedImage from 'react-native-expo-cached-image'

type Props = {}

const buttonSize = winWidth * 0.05

export default function ChatHeader ({}: Props) {
  const selectedMessagingGroup = useAppSelector(
    store => store.messagingGroups.selectedGroup
  )
  const colors = useAppSelector(store => store.colors)
  const user = useAppSelector(store => store.user)
  const dispatch = useAppDispatch()

  const group: MessagingGroup = selectedMessagingGroup.group

  const contact: Member | null = selectedMessagingGroup.members.filter(
    m => m.id !== user.id
  )[0]

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => dispatch(selectMessagingGroup(null))}
      >
        <AntDesign name='left' size={buttonSize} color={colors.lightColor} />
      </Pressable>
      <Pressable style={styles.contactHolder}>
        <CachedImage
          style={styles.profilePic}
          source={{ uri: contact?.profileLocation }}
        />
        <Text style={{ ...styles.handle, color: colors.lightColor }}>
          {contact?.username}
        </Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Entypo
          name='dots-three-horizontal'
          size={buttonSize}
          color={colors.lightColor}
        />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: winHeight * 0.09,
    width: winWidth,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: winHeight * 0.02,
    flexDirection: 'row'
  },
  handle: {
    fontSize: winWidth * 0.035,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  button: {
    width: winWidth * 0.12,
    alignItems: 'center'
  },
  profilePic: {
    width: winWidth * 0.09,
    aspectRatio: 1,
    borderRadius: winWidth * 0.06
  },
  contactHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: winWidth * 0.25
  }
})
