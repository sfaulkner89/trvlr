import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../types/colors'
import { Member } from '../../types/Member'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import { MessagingGroup } from '../../types/MessagingGroup'
import { Feather, SimpleLineIcons } from '@expo/vector-icons'
import { useMutation } from '@apollo/client'
import { FOLLOW } from '../../handlers/gql/follow/follow'
import { UNFOLLOW } from '../../handlers/gql/follow/unfollow'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/slices/userSlice'
import { setProfile } from '../../redux/slices/profileSlice'
import { setContact } from '../../redux/slices/contactSlice'
import { useAppSelector } from '../../redux/hooks'

type Props = {
  colors: Colors
  profile: Member
  isCurrentUser: boolean
  currentUser: Member
}
const buttonSize = winWidth * 0.05

export default function ProfileInfoLine ({
  colors,
  profile,
  isCurrentUser,
  currentUser
}: Props) {
  const [follow] = useMutation(FOLLOW)
  const [unfollow] = useMutation(UNFOLLOW)
  const dispatch = useDispatch()
  const [following, setFollowing] = useState(
    currentUser.following.includes(profile.id)
  )
  const [follows, setFollows] = useState(
    currentUser.followers.includes(profile.id)
  )
  const contacts = useAppSelector(state => state.contact)
  const followHandler = () => {
    if (following) {
      unfollow({ variables: { userId: currentUser.id, followId: profile.id } })
      setFollowing(false)
      currentUser.following = currentUser.following.filter(
        f => f !== profile.id
      )
      profile = {
        ...profile,
        followers: profile.followers.filter(f => f !== currentUser.id)
      }
    } else {
      follow({ variables: { userId: currentUser.id, followId: profile.id } })
      setFollowing(true)
      currentUser.following = [...currentUser.following, profile.id]
      profile = {
        ...profile,
        followers: [...profile.followers, currentUser.id]
      }
    }
    dispatch(setUser(currentUser))
    dispatch(setProfile(profile))
  }

  return (
    <View style={{ ...styles.container }}>
      <Text style={{ ...styles.username, color: colors.lightColor }}>
        📍 Boston, US
      </Text>
      {follows && <Text>Follows You</Text>}
      <Text style={{ ...styles.bio, color: colors.lightColor }}>
        {profile.bio}
      </Text>
      {!isCurrentUser ? (
        <View style={styles.buttonHolder}>
          <Pressable
            style={{ ...styles.button, borderColor: colors.lightColor }}
            onPress={() => dispatch(setContact(contacts[profile.id]))}
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
