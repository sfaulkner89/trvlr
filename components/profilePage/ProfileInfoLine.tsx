import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../types/colors'
import { Member } from '../../types/Member'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import { Feather, SimpleLineIcons } from '@expo/vector-icons'
import { useMutation } from '@apollo/client'
import { FOLLOW } from '../../handlers/gql/follow/follow'
import { UNFOLLOW } from '../../handlers/gql/follow/unfollow'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/slices/userSlice'
import { setContact } from '../../redux/slices/contactSlice'
import { useAppSelector } from '../../redux/hooks'
import { showChatPage } from '../../redux/slices/messageSlice'

type Props = {
  colors: Colors
  isCurrentUser: boolean
}
const buttonSize = winWidth * 0.05

export default function ProfileInfoLine ({ colors, isCurrentUser }: Props) {
  const [follow] = useMutation(FOLLOW)
  const [unfollow] = useMutation(UNFOLLOW)
  const dispatch = useDispatch()

  const user: Member = useAppSelector(state => state.user)
  const contact: Member = useAppSelector(state => state.contact.selectedContact)

  const profile = isCurrentUser ? user : contact

  const [following, setFollowing] = useState(
    user?.following?.includes(contact?.id) || false
  )
  const [follows, setFollows] = useState(
    (user?.followers?.includes(contact?.id) && user.id !== contact?.id) || false
  )
  const followHandler = () => {
    const currentUser = { ...user }
    const currentContact = { ...contact }
    if (following) {
      unfollow({
        variables: { userId: currentUser.id, followId: currentContact.id }
      })
      setFollowing(false)
      currentUser.following = currentUser.following.filter(
        f => f !== currentContact.id
      )
      currentContact.followers = currentContact.followers.filter(
        (f: string) => f !== currentUser.id
      )
    } else {
      follow({
        variables: { userId: currentUser.id, followId: currentContact.id }
      })
      setFollowing(true)
      currentUser.following = [...currentUser.following, currentContact.id]
      currentContact.followers = [...currentContact.followers, currentUser.id]
    }
    dispatch(setUser(currentUser))
    dispatch(setContact(currentContact))
  }
  const chatHandler = () => {
    dispatch(showChatPage())
  }

  return (
    <View style={{ ...styles.container }}>
      <Text style={{ ...styles.username, color: colors.lightColor }}>
        {profile.checkInLocation?.names.main_text}
      </Text>
      {follows && <Text>Follows You</Text>}
      <Text style={{ ...styles.bio, color: colors.lightColor }}>
        {profile.bio}
      </Text>
      {!isCurrentUser ? (
        <View style={styles.buttonHolder}>
          <Pressable
            style={{ ...styles.button, borderColor: colors.lightColor }}
            onPress={chatHandler}
          >
            <Feather
              name='message-circle'
              size={buttonSize}
              color={colors.lightColor}
            />
            <Text style={{ ...styles.buttonText, color: colors.lightColor }}>
              Message
            </Text>
          </Pressable>

          <Pressable
            style={{ ...styles.button, borderColor: colors.lightColor }}
            onPress={followHandler}
          >
            <SimpleLineIcons
              name={following ? 'user-unfollow' : 'user-follow'}
              size={buttonSize}
              color={colors.lightColor}
            />
            <Text style={{ ...styles.buttonText, color: colors.lightColor }}>
              {following ? 'Unfollow' : 'Follow'}
            </Text>
          </Pressable>
        </View>
      ) : (
        <View />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: winHeight * 0.01,

    minHeight: winHeight * 0.05,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  username: {},
  bio: {},
  buttonHolder: {
    flexDirection: 'row',
    marginBottom: winHeight * 0.01,
    marginTop: winHeight * 0.01,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: winWidth * 0.8
  },
  button: {
    width: winWidth * 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderWidth: winWidth * 0.005,
    borderRadius: winWidth * 0.03,
    padding: winWidth * 0.02
  },
  buttonText: {}
})
