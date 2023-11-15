import { useLazyQuery, useSubscription } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { userCache } from './assets/caches/userCache'
import ContactScreen from './components/contactScreen/ContactScreen'
import Map from './components/map/Map'
import ChatListPage from './components/messaging/ChatListPage'
import ProfilePage from './components/profilePage/ProfilePage'
import Search from './components/search/Search'
import SignUpPage from './components/signUp/SignUpPage'
import Toolbar from './components/toolbar/Toolbar'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { setUser } from './redux/slices/userSlice'
import { Colors } from './types/colors'
import { GETUSERPOPULATED } from './handlers/gql/users/getUserPopulated'
import ModalStack from './components/modals/ModalStack'
import LoginPage from './components/LoginPage/LoginPage'
import { NEW_MESSAGES } from './handlers/gql/subscriptions/newMessages'
import {
  selectMessagingGroup,
  setLastUpdated,
  setMessagingGroups,
  setMessagingGroupsShallow,
  updateMessagingGroup
} from './redux/slices/messagingGroupSlice'
import { registerForPushNotificationsAsync } from './assets/config/pushNotifications'
import * as Notifications from 'expo-notifications'
import { setToken } from './redux/slices/notificationSlice'
import { FOLLOW_CHANGE } from './handlers/gql/subscriptions/followChange'

export const colors: Colors = {
  darkColor: '#34333a',
  midColor: '#4b4a54',
  lightColor: '#cccccc',
  selectedColor: '#98b68a',
  errorColor: '#ae1d24',
  whiteColor: '#ffffff'
}

export default function App () {
  const [page, setPage] = useState(0)
  const [messages, setMessages] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [newUser, setNewUser] = useState(false)

  const [notification, setNotification] = useState(null)

  const notificationListener = React.useRef(null)
  const responseListener = React.useRef(null)

  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user)
  const selectedMessagingGroup = useAppSelector(
    state => state.messagingGroups.selectedGroup
  )
  const lastUpdated = useAppSelector(state => state.messagingGroups.lastUpdated)
  const [getUser] = useLazyQuery(GETUSERPOPULATED)
  const { data: messageData } = useSubscription(NEW_MESSAGES, {
    variables: { id: user.id },
    onData: async ({}) => {
      console.log('DATA' + user.displayName)
    },
    onComplete: () => {
      console.log('subscribed to new messages')
    },
    onError: err => {
      console.log('ERROR', err)
    }
  })

  const { data: followData } = useSubscription(FOLLOW_CHANGE, {
    variables: { id: user.id },
    onData: async ({}) => {
      console.log('FOLLOW DATA' + user.displayName)
    }
  })

  useEffect(() => {
    if (messageData) {
      console.log(JSON.stringify(messageData).length)
      dispatch(setMessagingGroupsShallow(messageData.newMessages))
      if (selectedMessagingGroup) {
        dispatch(updateMessagingGroup(messageData.newMessages))
      }
    }
  }, [messageData])

  useEffect(() => {
    const followInfo = followData?.followChange
    if (followInfo?.follow) {
    }
  }, [followData])

  useEffect(() => {
    const profileCache = async () => {
      const user = await userCache.get('primary')
      if (user) {
        await getUser({
          variables: { id: JSON.parse(user).id, populated: true }
        }).then(res => {
          dispatch(setUser(res?.data.getUser))
          if (res?.data.getUser?.messagingGroups) {
            dispatch(setMessagingGroups(res?.data.getUser.messagingGroups))
          }
        })
        setLoggedIn(true)
      }
    }
    dispatch(setLastUpdated(new Date()))
    profileCache()
  }, [])

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => dispatch(setToken(token)))

    notificationListener.current =
      Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification)
      })

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response)
      })

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

  const pages = [
    <Map
      colors={colors}
      currentUser={user}
      isCurrentUser={true}
      setMessages={setMessages}
      setPage={setPage}
    />,
    <Search colors={colors} currentUser={user} />,
    <ContactScreen colors={colors} />,
    <ProfilePage colors={colors} />
  ]
  return !loggedIn ? (
    newUser ? (
      <SignUpPage
        colors={colors}
        setLoggedIn={setLoggedIn}
        setNewUser={setNewUser}
      />
    ) : (
      <LoginPage
        colors={colors}
        setLoggedIn={setLoggedIn}
        setNewUser={setNewUser}
      />
    )
  ) : (
    <View style={styles.container}>
      <ModalStack />
      <View style={styles.contentHolder}>{pages[page]}</View>
      <Toolbar colors={colors} page={page} setPage={setPage} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  contentHolder: {
    flex: 1
  }
})
