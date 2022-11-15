import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
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

const winHeight = Dimensions.get('window').height
const winWidth = Dimensions.get('window').width
const size = winWidth * 0.06

type Props = {
  colors: Colors
  profile: Member
  setProfilePage: (active: boolean) => void
}

export default function ProfilePage ({
  colors,
  profile,
  setProfilePage
}: Props) {
  const [selection, setSelection] = useState(0)
  const [selectedList, setSelectedList] = useState<List | undefined>()

  const buttonMap = [
    <ProfileMap />,
    <ProfileListPage
      colors={colors}
      member={profile}
      setSelectedList={setSelectedList}
    />,
    <View />
  ]

  return selectedList ? (
    <ListPage
      colors={colors}
      list={selectedList}
      setSelectedList={setSelectedList}
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
        icon='user-edit'
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
    flex: 1,
    marginTop: winHeight * 0.02
  }
})
