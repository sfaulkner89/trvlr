import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Map from './components/map/Map'
import Toolbar from './components/toolbar/Toolbar'
import Search from './components/search/Search'
import ContactScreen from './components/contactScreen/ContactScreen'
import HeaderBar from './components/headerBar/HeaderBar'
import ProfilePage from './components/profilePage/ProfilePage'
import ChatListPage from './components/messaging/ChatListPage'
import SignUpPage from './components/signUp/SignUpPage'
import { Colors } from './types/colors'
import { userCache } from './assets/caches/userCache'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { setUser } from './redux/slices/userSlice'

export const colors: Colors = {
  darkColor: '#34333a',
  midColor: '#4b4a54',
  lightColor: '#cccccc',
  selectedColor: '#98b68a',
  errorColor: '#732017'
}

export default function App () {
  const [userProfile, setUserProfile] = useState()
  const [page, setPage] = useState(0)
  const [messages, setMessages] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const dispatch = useAppDispatch()
  const store = useAppSelector(state => state)

  useEffect(() => {
    const profileCache = async () => {
      const profile = await userCache.get('primary')
      if (profile) {
        setUserProfile(JSON.parse(profile))
        dispatch(setUser(JSON.parse(profile)))
        setLoggedIn(true)
      }
    }
    profileCache()
  }, [loggedIn])

  const pages = [
    <Map
      colors={colors}
      currentUser={userProfile}
      isCurrentUser={true}
      setMessages={setMessages}
    />,
    <Search colors={colors} />,
    <ContactScreen colors={colors} currentUser={userProfile} />,
    <ProfilePage
      colors={colors}
      profile={userProfile}
      isCurrentUser={true}
      currentUser={userProfile}
    />
  ]
  return !loggedIn ? (
    <SignUpPage colors={colors} setLoggedIn={setLoggedIn} />
  ) : messages ? (
    <ChatListPage
      colors={colors}
      currentUser={userProfile}
      setMessages={setMessages}
    />
  ) : (
    <View style={styles.container}>
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
