import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../../types/colors'
import { Member } from '../../../types/Member'
import ListMini from './ListMini'
import { List } from '../../../types/List'
import { useQuery } from '@apollo/client'
import { GETUSERLISTS } from '../../../handlers/gql/lists/getUserLists'
import { winHeight, winWidth } from '../../../assets/variables/height-width'
import OptionHolder from '../../../components/listPage/OptionHolder'
import { newListOption } from '../../../assets/variables/newListOption'
import { Entypo } from '@expo/vector-icons'
import Checkbox from 'expo-checkbox'
import NoteInputScreen from '../../listPage/NoteInputScreen'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import {
  hideAddToList,
  hideNoteScreen,
  showNewList,
  showNoteScreen
} from '../../../redux/slices/listSlice'
import NewListHeader from './NewListHeader'

type Props = {
  newListProvided: boolean
  submitHandler?: (list: List) => void
}

export default function ProfileListPage ({
  newListProvided,
  submitHandler
}: Props) {
  const user = useAppSelector(state => state.user)
  const contact = useAppSelector(state => state.contact.selectedContact)
  const colors = useAppSelector(state => state.colors)

  const profile = contact ? contact : user

  const { data, refetch } = useQuery(GETUSERLISTS, {
    variables: { id: profile.id }
  })

  useEffect(() => {
    refetch()
  }, [submitHandler])

  const pressHandler = async (list: List) => {
    submitHandler(list)
    setTimeout(refetch, 200)
  }

  return (
    <View style={{ ...styles.container, backgroundColor: colors.midColor }}>
      {newListProvided && <NewListHeader />}
      <ScrollView>
        {data &&
          data.getUser.lists.map((list: List, i: number) => {
            return (
              <ListMini
                list={list}
                key={i}
                submitHandler={pressHandler}
                refetch={refetch}
              />
            )
          })}
        <View style={styles.padding} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: winWidth
  },
  closeButtonText: {
    fontSize: winWidth * 0.05
  },
  padding: {
    height: winHeight * 0.1
  }
})
