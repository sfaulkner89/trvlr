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

type Props = {
  colors: Colors
  member: Member
  setSelectedList: (list: List) => void
  selectedList: List
  isCurrentUser: boolean
  newListProvided: boolean
  setNewList: (set: boolean) => void
  setAddToList: (set: boolean) => void
  addToList: boolean
}

export default function ProfileListPage ({
  colors,
  member,
  setSelectedList,
  selectedList,
  newListProvided,
  setNewList,
  setAddToList,
  addToList
}: Props) {
  const { data, refetch } = useQuery(GETUSERLISTS, {
    variables: { id: member.id }
  })
  const [noteRequested, setNoteRequested] = useState<boolean>(false)
  const [noteScreen, setNoteScreen] = useState<boolean>(false)
  useEffect(() => {
    refetch()
  }, [])
  return (
    <View style={{ ...styles.container, backgroundColor: colors.midColor }}>
      {newListProvided && (
        <View>
          {!noteScreen && (
            <Pressable
              style={styles.noteCheckbox}
              onPress={() => setNoteRequested(r => !r)}
            >
              <Checkbox
                value={noteRequested}
                color={colors.lightColor}
                onValueChange={() => setNoteRequested(r => !r)}
              />
              <Text
                style={{
                  ...styles.noteCheckboxText,
                  color: colors.lightColor
                }}
              >
                Add Note?
              </Text>
            </Pressable>
          )}
          <Pressable
            onPress={() => setAddToList(false)}
            style={styles.closeButton}
          >
            <Entypo
              name='cross'
              size={winWidth * 0.08}
              color={colors.lightColor}
            />
          </Pressable>
          {!noteScreen && (
            <View style={styles.newList}>
              <OptionHolder
                colors={colors}
                option={newListOption(setNewList, setAddToList, colors)}
              />
            </View>
          )}
        </View>
      )}
      {noteScreen ? (
        <NoteInputScreen
          list={selectedList}
          colors={colors}
          setAddToList={setAddToList}
        />
      ) : (
        <ScrollView>
          {data &&
            data.getUser.lists.map((list: List, i: number) => {
              return (
                <ListMini
                  colors={colors}
                  list={list}
                  key={i}
                  setSelectedList={setSelectedList}
                  selectedList={selectedList}
                  addToList={addToList}
                  setAddToList={setAddToList}
                  noteRequested={noteRequested}
                  setNoteScreen={setNoteScreen}
                />
              )
            })}
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: winWidth
  },
  newList: {
    marginTop: winHeight * 0.1,
    height: winHeight * 0.1,
    width: winWidth,
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row'
  },
  closeButton: {
    position: 'absolute',
    top: winHeight * 0.05,
    right: winWidth * 0.05
  },
  noteCheckbox: {
    position: 'absolute',
    top: winHeight * 0.06,
    left: winWidth * 0.05,
    flexDirection: 'row',
    alignItems: 'center'
  },
  noteCheckboxText: {
    marginLeft: winWidth * 0.02
  },
  closeButtonText: {
    fontSize: winWidth * 0.05
  }
})
