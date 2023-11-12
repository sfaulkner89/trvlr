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
import { setMessagingGroups } from './redux/slices/messagingGroupSlice'

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

  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user)
  const [getUser] = useLazyQuery(GETUSERPOPULATED)
  const { data: messageData } = useSubscription(NEW_MESSAGES, {
    variables: { ids: [user.id] }
  })

  useEffect(() => {
    const profileCache = async () => {
      const user = await userCache.get('primary')
      if (user) {
        console.log('user', user)
        await getUser({
          variables: { id: JSON.parse(user).id, populated: true }
        }).then(res => {
          console.log(res.data)
          dispatch(setUser(res?.data.getUser))
          dispatch(setMessagingGroups(res?.data.getUser.messagingGroups))
        })
        setLoggedIn(true)
      }
    }

    profileCache()
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
