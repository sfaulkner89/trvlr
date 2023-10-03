import { QueryResult, useLazyQuery, useQuery } from '@apollo/client'
import { db } from './assets/config/firebaseConfig'
import { child, get, ref } from 'firebase/database'
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
import { GETUSER } from './handlers/gql/users/getUser'

export const colors: Colors = {
  darkColor: '#34333a',
  midColor: '#4b4a54',
  lightColor: '#cccccc',
  selectedColor: '#98b68a',
  errorColor: '#ae1d24'
}

export default function App () {
  const [page, setPage] = useState(0)
  const [messages, setMessages] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user)
  const [getUser, { data }] = useLazyQuery(GETUSER)

  useEffect(() => {
    const profileCache = async () => {
      const user = await userCache.get('primary')
      if (user) {
        await getUser({
          variables: { id: JSON.parse(user).id }
        })
        dispatch(setUser(data?.getUser))
        setLoggedIn(true)
      }
    }

    profileCache()
  }, [])

  // const {data, refetch } = useQuery(GETUSER, {
  //   variables: { id: user.id }
  // })

  // useEffect(() => {
  //   refetch()
  //   console.log('refetching')
  //   if (data) dispatch(setUser(data?.getUser))
  //   if (data) console.log(data.getUser)
  // }, [user])

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
      currentUser={user}
      isCurrentUser={true}
      setMessages={setMessages}
      setPage={setPage}
    />,
    <Search colors={colors} currentUser={user} setPage={setPage} />,
    <ContactScreen colors={colors} currentUser={user} setPage={setPage} />,
    <ProfilePage
      colors={colors}
      member={user}
      isCurrentUser={true}
      currentUser={user}
      setPage={setPage}
    />
  ]
  return !loggedIn ? (
    <SignUpPage colors={colors} setLoggedIn={setLoggedIn} />
  ) : messages ? (
    <ChatListPage
      colors={colors}
      currentUser={user}
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
