import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable
} from 'react-native'
import React from 'react'
import { Colors } from '../../types/colors'
import { Member } from '../../types/Member'

import CachedImage from 'react-native-expo-cached-image'
import { useAppSelector } from '../../redux/hooks'
import { RootState } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { setProfile } from '../../redux/slices/profileSlice'
import { setContact } from '../../redux/slices/contactSlice'

const winHeight = Dimensions.get('window').height
const winWidth = Dimensions.get('window').width

type Props = {
  member: Member
  colors: Colors
}

export default function MemberListItem ({ member, colors }: Props) {
  const profile = useAppSelector((store: RootState) => store.profile)
  const dispatch = useDispatch()

  const contactHandler = () => {
    dispatch(setContact(member))
  }

  return (
    <Pressable
      style={{
        ...styles.container,
        backgroundColor: colors.midColor,
        borderBottomColor: colors.darkColor
      }}
      onPress={contactHandler}
    >
      <CachedImage
        style={styles.profilePicture}
        source={{ uri: member.profileLocation }}
      />
      <View style={styles.dataHolder}>
        <View style={styles.usernameHolder}>
          <Text style={{ ...styles.username, color: colors.lightColor }}>
            {member.username}
          </Text>
        </View>
        <View style={styles.handleHolder}>
          <Text style={{ ...styles.handle, color: colors.lightColor }}>
            @{member.displayName}
          </Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 0.08 * winHeight,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    width: winWidth,
    paddingTop: winHeight * 0.02,
    paddingBottom: winHeight * 0.02
  },
  profilePicture: {
    width: 0.13 * winWidth,
    aspectRatio: 1,
    marginLeft: winWidth * 0.02
  },
  dataHolder: {
    flexDirection: 'column',
    marginLeft: winWidth * 0.03
  },
  username: {
    fontWeight: 'bold'
  },
  usernameHolder: {},
  handleHolder: {},
  handle: {}
})
