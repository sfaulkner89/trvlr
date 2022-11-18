import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../types/colors'
import { Member } from '../../../types/Member'
import ListMini from './ListMini'
import { List } from '../../../types/List'

type Props = {
  colors: Colors
  member: Member
  setSelectedList: (list: List) => void
  currentUser: boolean
}

export default function ProfileListPage ({
  colors,
  member,
  setSelectedList
}: Props) {
  return (
    <ScrollView
      style={{ ...styles.container, backgroundColor: colors.midColor }}
    >
      {member.lists.map((list, i) => {
        return (
          <ListMini
            colors={colors}
            list={list}
            key={i}
            setSelectedList={setSelectedList}
          />
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
