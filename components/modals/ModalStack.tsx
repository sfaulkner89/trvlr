import { StyleSheet, Text, View } from 'react-native'
import * as React from 'react'
import ProfilePage from '../profilePage/ProfilePage'
import { useAppSelector } from '../../redux/hooks'
import ListPage from '../listPage/ListPage'
import Options from '../listPage/Options'
import profileOptions from '../../assets/variables/profileOptions'
import ChatListPage from '../messaging/ChatListPage'
import ListEditor from '../listPage/ListEditor'
import NotificationScreen from '../notificationScreen/NotificationScreen'

export default function ModalStack () {
  const colors = useAppSelector(state => state.colors)
  const contact = useAppSelector(state => state.contact.selectedContact)
  const currentUser = useAppSelector(state => state.user)
  const newList = useAppSelector(state => state.list.newList)
  const selectedList = useAppSelector(state => state.list.selectedList)
  const optionsType = useAppSelector(state => state.options.optionsType)
  const chatPage = useAppSelector(state => state.message.chatPage)
  const addToList = useAppSelector(state => state.list.addToList)
  const listEdit = useAppSelector(state => state.list.listEdit)
  const notificationScreen = useAppSelector(
    state => state.notification.notificationScreen
  )

  return (
    <View style={{ ...styles.container }}>
      {optionsType ? (
        <Options colors={colors} />
      ) : notificationScreen ? (
        <NotificationScreen />
      ) : chatPage ? (
        <ChatListPage colors={colors} currentUser={currentUser} />
      ) : listEdit ? (
        <ListEditor />
      ) : selectedList ? (
        <ListPage colors={colors} list={selectedList} />
      ) : contact ? (
        <ProfilePage colors={colors} />
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 100000
  }
})
