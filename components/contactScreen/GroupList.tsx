import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { Colors } from '../../types/colors'
import MemberListItem from './MemberListItem'
import { Member } from '../../types/Member'
import { GroupInfo } from '../../types/GroupInfo'

const winHeight = Dimensions.get('window').height
const winWidth = Dimensions.get('window').width

type Props = {
  colors: Colors
  group: GroupInfo
  setContact: (member: Member) => void
  setProfilePage: (active: boolean) => void
}

export default function GroupList ({
  group,
  colors,
  setContact,
  setProfilePage
}: Props) {
  return (
    <View style={styles.container}>
      <View style={{ ...styles.nameHolder, backgroundColor: colors.darkColor }}>
        <Text style={{ ...styles.name, color: colors.lightColor }}>
          {group.groupName}
        </Text>
      </View>
      {group.memberProfiles.map((member, i) => {
        return (
          <MemberListItem
            member={member}
            colors={colors}
            key={i}
            setContact={setContact}
            setProfilePage={setProfilePage}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: winWidth
  },
  nameHolder: {
    height: winHeight * 0.03,
    justifyContent: 'center'
  },
  name: {
    fontSize: winWidth * 0.03
  }
})
