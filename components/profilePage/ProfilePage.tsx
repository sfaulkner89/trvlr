import { StyleSheet, View, Dimensions, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../types/colors'
import Selector from '../search/Selector'
import profileButton from '../../assets/variables/profileButton'
import ProfileMap from './ProfileMap'
import ProfileTopLine from './ProfileTopLine'
import ProfileHeader from './ProfileHeader'
import { Member } from '../../types/Member'
import ProfileListPage from './profileList/ProfileListPage'
import { List } from '../../types/List'
import ListPage from '../listPage/ListPage'
import Options from '../listPage/Options'
import profileOptions from '../../assets/variables/profileOptions'
import { AntDesign } from '@expo/vector-icons'
import ChatScreen from '../messaging/ChatScreen'
import NewListPage from '../newList/NewListPage'
import ProfileInfoLine from './ProfileInfoLine'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { changePageNumber } from '../../redux/slices/contactSlice'

const winHeight = Dimensions.get('window').height
const winWidth = Dimensions.get('window').width
const size = winWidth * 0.06

type Props = {
  colors: Colors
}

export default function ProfilePage ({ colors }: Props) {
  const currentUser = useAppSelector(state => state.user)
  const contact = useAppSelector(state => state.contact.selectedContact)

  const isCurrentUser = !contact

  const profile = isCurrentUser ? currentUser : contact

  const [selectedList, setSelectedList] = useState<List | undefined>()
  const [profileSelection, setProfileSelection] = useState<Member | undefined>()

  const dispatch = useAppDispatch()
  const page = useAppSelector(state => state.contact.pageNumber)

  const [newList, setNewList] = useState<boolean>()

  const buttonMap = [
    <ProfileMap />,
    <ProfileListPage
      colors={colors}
      newListProvided={false}
      addToList={false}
    />
  ]

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: colors.darkColor
      }}
    >
      <ProfileHeader
        colors={colors}
        profile={profile}
        isCurrentUser={isCurrentUser}
      />
      <ProfileTopLine colors={colors} isCurrentUser={isCurrentUser} />
      <ProfileInfoLine colors={colors} isCurrentUser={isCurrentUser} />
      <Selector
        colors={colors}
        buttonList={profileButton}
        selection={page}
        setSelection={i => dispatch(changePageNumber(i))}
      />
      <View style={styles.selectionHolder}>{buttonMap[page]}</View>
      {page === 1 && isCurrentUser ? (
        <Pressable
          style={{
            ...styles.addListButton,
            backgroundColor: colors.lightColor
          }}
          onPress={() => setNewList(true)}
        >
          <AntDesign name='addfile' size={size} color={colors.midColor} />
        </Pressable>
      ) : (
        <View />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: winHeight,
    width: winWidth,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  username: {
    fontSize: winWidth * 0.04,
    marginTop: winHeight * 0.02,
    marginBottom: winHeight * 0.01
  },

  selectionHolder: {
    marginTop: winHeight * 0.02
  },
  addListButton: {
    position: 'absolute',
    bottom: winHeight * 0.1,
    right: winWidth * 0.04,
    padding: winWidth * 0.025,
    borderRadius: size,
    opacity: 0.8,
    shadowOpacity: 0.6,
    shadowOffset: { width: winWidth * 0.01, height: winWidth * 0.01 }
  }
})
