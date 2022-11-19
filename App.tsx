import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Map from './components/map/Map'
import Toolbar from './components/toolbar/Toolbar'
import Search from './components/search/Search'
import ContactScreen from './components/contactScreen/ContactScreen'
import HeaderBar from './components/headerBar/HeaderBar'
import ProfilePage from './components/profilePage/ProfilePage'
import userProfile from './assets/data/currentUserData'
import ChatListPage from './components/messaging/ChatListPage'

export const colors = {
  darkColor: '#34333a',
  midColor: '#4b4a54',
  lightColor: '#cccccc',
  selectedColor: '#6b7341'
}

export default function App () {
  const [page, setPage] = useState(0)
  const [messages, setMessages] = useState(false)
  const pages = [
    <Map colors={colors} />,
    <Search colors={colors} />,
    <ContactScreen colors={colors} currentUser={userProfile} />,
    <ProfilePage
      colors={colors}
      profile={userProfile}
      isCurrentUser={true}
      currentUser={userProfile}
    />
  ]
  return messages ? (
    <ChatListPage
      colors={colors}
      currentUser={userProfile}
      setMessages={setMessages}
    />
  ) : (
    <View style={styles.container}>
      {page === 0 ? (
        <HeaderBar colors={colors} setMessages={setMessages} />
      ) : (
        <View />
      )}
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
