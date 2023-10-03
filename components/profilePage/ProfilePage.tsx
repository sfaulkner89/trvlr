import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Pressable
} from 'react-native'
import React, { useEffect, useState } from 'react'
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
import { useQuery } from '@apollo/client'
import { setUser } from '../../redux/slices/userSlice'
import { GETUSER } from '../../handlers/gql/users/getUser'
import { setContact } from '../../redux/slices/contactSlice'

const winHeight = Dimensions.get('window').height
const winWidth = Dimensions.get('window').width
const size = winWidth * 0.06

type Props = {
  colors: Colors
  member: Member
  setProfilePage?: (active: boolean) => void
  isCurrentUser: boolean
  currentUser: Member
  setPage: (set: number) => void
}

export default function ProfilePage ({
  colors,
  setProfilePage,
  member,
  isCurrentUser,
  currentUser,
  setPage
}: Props) {
  const profile = isCurrentUser ? useAppSelector(state => state.user) : member

  // const { data, refetch } = useQuery<{ getUser: Member }>(GETUSER, {
  //   variables: { id: profile?.id }
  // // })
  // useEffect(() => {
  //   refetch()
  // }, [profile])

  const [selection, setSelection] = useState<number>(0)
  const [selectedList, setSelectedList] = useState<List | undefined>()
  const [profileSelection, setProfileSelection] = useState<Member | undefined>()

  const contact = useAppSelector(state => state.contact[profile?.id])

  const dispatch = useAppDispatch()
  const [newList, setNewList] = useState<boolean>()

  const buttonMap = [
    <ProfileMap />,
    <ProfileListPage
      colors={colors}
      member={profile}
      setSelectedList={setSelectedList}
      isCurrentUser={isCurrentUser}
      selectedList={selectedList}
      setNewList={setNewList}
      newListProvided={false}
      addToList={false}
      setAddToList={() => {}}
    />,
    <View />
  ]

  return newList ? (
    <NewListPage
      colors={colors}
      currentUser={currentUser}
      setNewList={setNewList}
      setSelectedList={setSelectedList}
    />
  ) : contact ? (
    <ChatScreen profile={profile} colors={colors} currentUser={currentUser} />
  ) : selectedList ? (
    <ListPage
      colors={colors}
      list={selectedList}
      setSelectedList={setSelectedList}
      isCurrentUser={isCurrentUser}
      setPage={setPage}
    />
  ) : profileSelection ? (
    <Options
      colors={colors}
      options={profileOptions(colors)}
      selection={profileSelection}
      setSelection={setProfileSelection}
    />
  ) : (
    <View
      style={{
        ...styles.container,
        backgroundColor: colors.darkColor
      }}
    >
      <ProfileHeader
        colors={colors}
        profile={profile}
        setProfilePage={setProfilePage}
        setSelection={setProfileSelection}
        isCurrentUser={isCurrentUser}
      />
      <ProfileTopLine colors={colors} profile={profile} />
      <ProfileInfoLine
        colors={colors}
        profile={profile}
        isCurrentUser={isCurrentUser}
        currentUser={currentUser}
      />
      <Selector
        colors={colors}
        buttonList={profileButton}
        selection={selection}
        setSelection={setSelection}
      />
      <View style={styles.selectionHolder}>{buttonMap[selection]}</View>
      {selection === 1 && isCurrentUser ? (
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
