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

const winHeight = Dimensions.get('window').height
const winWidth = Dimensions.get('window').width

type Props = {
  member: Member
  colors: Colors
  setContact: (contact: Member) => void
  setProfilePage: (active: boolean) => void
}

export default function MemberListItem ({
  member,
  colors,
  setContact,
  setProfilePage
}: Props) {
  const contactHandler = () => {
    setContact(member)
    setProfilePage(true)
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
      <Image style={styles.profilePicture} source={member.profilePicture} />
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
    borderBottomWidth: 1
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
