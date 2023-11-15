import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { MessagingGroup } from '../../types/MessagingGroup'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectMessagingGroup } from '../../redux/slices/messagingGroupSlice'
import CachedImage from 'react-native-expo-cached-image'
import moment from 'moment'

type Props = {
  messagingGroup: MessagingGroup
}

export default function MessagingMini ({ messagingGroup }: Props) {
  const dispatch = useAppDispatch()
  const colors = useAppSelector(store => store.colors)
  const user = useAppSelector(store => store.user)

  const dateModified = moment(parseInt(messagingGroup.dateModified))

  const contact = messagingGroup.members.find(x => x.id !== user.id)
  const lastMessage =
    messagingGroup?.messages[messagingGroup?.messages.length - 1]

  const otherDayString = dateModified.format('DD MMM')

  const todayString = dateModified.format('HH:mm')

  const imageSource = (
    <CachedImage
      style={styles.profilePicture}
      source={{ uri: contact.profileLocation }}
    />
  )

  return (
    <Pressable
      style={{
        ...styles.container,
        backgroundColor: colors.midColor,
        borderBottomColor: colors.darkColor
      }}
      onPress={() => dispatch(selectMessagingGroup(messagingGroup))}
    >
      {imageSource}
      <View style={styles.dataHolder}>
        <View style={styles.usernameHolder}>
          <Text style={{ ...styles.username, color: colors.lightColor }}>
            {contact.username}
          </Text>
        </View>
        <View style={styles.handleHolder}>
          <Text style={{ ...styles.handle, color: colors.lightColor }}>
            {!moment().isSame(dateModified, 'day')
              ? otherDayString
              : todayString}{' '}
            {lastMessage?.message}
          </Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 0.08 * winHeight,
    width: winWidth,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1
  },
  profilePicture: {
    width: 0.13 * winWidth,
    aspectRatio: 1,
    marginLeft: winWidth * 0.02,
    borderRadius: winWidth * 0.13 * 0.5
  },
  dataHolder: {
    flexDirection: 'column',
    marginLeft: winWidth * 0.03
  },
  username: {
    fontWeight: 'bold'
  },
  usernameHolder: {},
  handleHolder: {},
  handle: {}
})
