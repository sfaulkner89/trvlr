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
import { setContact } from '../../redux/slices/contactSlice'
import { Entypo, FontAwesome } from '@expo/vector-icons'
import {
  setOptionsTarget,
  setOptionsType
} from '../../redux/slices/optionsSlice'

const winHeight = Dimensions.get('window').height
const winWidth = Dimensions.get('window').width

type Props = {
  member: Member
  optionsNeeded?: boolean
  visibilityHandler?: () => void
}

export default function MemberListItem ({
  member,
  optionsNeeded = false,
  visibilityHandler = () => {}
}: Props) {
  const dispatch = useDispatch()

  const colors = useAppSelector((store: RootState) => store.colors)

  const contactHandler = () => {
    dispatch(setContact(member))
  }

  const optionsHandler = () => {
    dispatch(setOptionsType('contact'))
    dispatch(setOptionsTarget(member))
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
      <View style={styles.leftSide}>
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
      </View>
      {optionsNeeded && (
        <View style={styles.rightSide}>
          <Pressable onPress={visibilityHandler}>
            <FontAwesome
              name={!member.visible ? 'eye-slash' : 'eye'}
              size={24}
              color={colors.lightColor}
            />
          </Pressable>
          <Pressable style={styles.options} onPress={optionsHandler}>
            <Entypo
              name='dots-three-horizontal'
              size={24}
              color={colors.lightColor}
            />
          </Pressable>
        </View>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 0.08 * winHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    width: winWidth,
    paddingTop: winHeight * 0.02,
    paddingBottom: winHeight * 0.02
  },
  options: {
    marginRight: winWidth * 0.02
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
    width: winWidth * 0.2,
    justifyContent: 'space-between'
  },
  profilePicture: {
    width: 0.13 * winWidth,
    aspectRatio: 1,
    marginLeft: winWidth * 0.02,
    borderRadius: winWidth * 0.1
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
