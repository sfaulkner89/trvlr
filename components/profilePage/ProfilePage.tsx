import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Pressable
} from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../types/colors'
import Selector from '../search/Selector'
import profileButton from '../../assets/variables/profileButton'
import ProfileMap from './ProfileMap'
import ProfileTopLine from './ProfileTopLine'
import ProfileHeader from './ProfileHeader'
import { Member } from '../../types/Member'
import ProfileListPage from './profileList/ProfileListPage'
import { Place } from '../../types/Place'
import { List } from '../../types/List'
import ListPage from '../listPage/ListPage'
import Options from '../listPage/Options'
import profileOptions from '../../assets/variables/profileOptions'
import { default as AnIcon } from 'react-native-vector-icons/AntDesign'

const winHeight = Dimensions.get('window').height
const winWidth = Dimensions.get('window').width
const size = winWidth * 0.06

type Props = {
  colors: Colors
  profile: Member
  setProfilePage?: (active: boolean) => void
  currentUser: boolean
}

export default function ProfilePage ({
  colors,
  profile,
  setProfilePage,
  currentUser
}: Props) {
  const [selection, setSelection] = useState<number>(0)
  const [selectedList, setSelectedList] = useState<List | undefined>()
  const [profileSelection, setProfileSelection] = useState<Member | undefined>()

  const buttonMap = [
    <ProfileMap />,
    <ProfileListPage
      colors={colors}
      member={profile}
      setSelectedList={setSelectedList}
      currentUser={currentUser}
    />,
    <View />
  ]

  return selectedList ? (
    <ListPage
      colors={colors}
      list={selectedList}
      setSelectedList={setSelectedList}
      currentUser={currentUser}
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
        currentUser={currentUser}
      />
      <ProfileTopLine colors={colors} profile={profile} />
      <Text style={{ ...styles.username, color: colors.lightColor }}>
        {profile.username}
      </Text>

      <Selector
        colors={colors}
        buttonList={profileButton}
        selection={selection}
        setSelection={setSelection}
      />
      <View style={styles.selectionHolder}>{buttonMap[selection]}</View>
      {selection === 1 ? (
        <Pressable
          style={{
            ...styles.addListButton,
            backgroundColor: colors.lightColor
          }}
        >
          <AnIcon name='addfile' size={size} color={colors.midColor} />
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
