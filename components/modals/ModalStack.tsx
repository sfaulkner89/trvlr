import { StyleSheet, Text, View } from 'react-native'
import * as React from 'react'
import ProfilePage from '../profilePage/ProfilePage'
import { useAppSelector } from '../../redux/hooks'
import NewListPage from '../newList/NewListPage'
import ListPage from '../listPage/ListPage'
import Options from '../listPage/Options'
import profileOptions from '../../assets/variables/profileOptions'
import ChatListPage from '../messaging/ChatListPage'
import ProfileListPage from '../profilePage/profileList/ProfileListPage'
import ListEditor from '../listPage/ListEditor'

export default function ModalStack () {
  const colors = useAppSelector(state => state.colors)
  const contact = useAppSelector(state => state.contact.selectedContact)
  const currentUser = useAppSelector(state => state.user)
  const newList = useAppSelector(state => state.list.newList)
  const selectedList = useAppSelector(state => state.list.selectedList)
  const optionsVisible = useAppSelector(state => state.options.optionsVisible)
  const chatPage = useAppSelector(state => state.message.chatPage)
  const addToList = useAppSelector(state => state.list.addToList)
  const listEdit = useAppSelector(state => state.list.listEdit)

  return (
    <View style={{ ...styles.container }}>
      {optionsVisible ? (
        <Options colors={colors} options={profileOptions(colors)} />
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
