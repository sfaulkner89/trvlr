import { QueryResult, useQuery } from '@apollo/client'
import { db } from './assets/config/firebaseConfig'
import { child, get, ref } from 'firebase/database'
import { GETUSERS } from './handlers/gql/users/getUsers'
import React, { useEffect, useState } from 'react'
import { Modal, StyleSheet, View } from 'react-native'
import { Member } from 'types/Member'
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

export const colors: Colors = {
  darkColor: '#34333a',
  midColor: '#4b4a54',
  lightColor: '#cccccc',
  selectedColor: '#98b68a',
  errorColor: '#ae1d24'
}

export default function App () {
  const [userProfile, setUserProfile] = useState<Member | undefined>()
  const [page, setPage] = useState(0)
  const [messages, setMessages] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [contactList, setContactList] = useState()

  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user)

  useEffect(() => {
    const profileCache = async () => {
      const user = await userCache.get('primary')
      if (user) {
        setUserProfile(JSON.parse(user))
        dispatch(setUser(JSON.parse(user)))
        setLoggedIn(true)
      }
      if (userProfile) {
        let messageList = get(
          child(ref(db), `/messages/${userProfile.id}`)
        ).then(snapshot => setContactList(snapshot.val()))
        console.log(messageList)
      }
    }

    profileCache()
  }, [])

  // const messagingContacts: QueryResult<Member[]> = useQuery(GETUSERS, {
  //   variables: { ids: Object.keys({ messageList }) }
  // })
  // const contacts = messagingContacts.data.map(mc => ({
  //   ...mc,
  //   messages: messageList[mc.id]
  // }))
  // console.log(contacts)

  const pages = [
    <Map
      colors={colors}
      currentUser={userProfile}
      isCurrentUser={true}
      setMessages={setMessages}
      setPage={setPage}
    />,
    <Search colors={colors} currentUser={userProfile} setPage={setPage} />,
    <ContactScreen
      colors={colors}
      currentUser={userProfile}
      setPage={setPage}
    />,
    <ProfilePage
      colors={colors}
      profile={userProfile}
      isCurrentUser={true}
      currentUser={userProfile}
      setPage={setPage}
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
