import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'
import OptionHolder from '../../listPage/OptionHolder'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { selectList, setListEdit } from '../../../redux/slices/listSlice'
import { newListOption } from '../../../assets/variables/newListOption'
import Checkbox from 'expo-checkbox'
import { winHeight, winWidth } from '../../../assets/variables/height-width'
import {
  resetListEditor,
  setNewList,
  setNewListScreen,
  setNoteRequested
} from '../../../redux/slices/listEditorSlice'

export default function NewListHeader () {
  const dispatch = useAppDispatch()
  const colors = useAppSelector(state => state.colors)
  const noteRequested = useAppSelector(state => state.listEditor.noteRequested)

  const exitHandler = () => {
    dispatch(resetListEditor())
    dispatch(setListEdit(false))
    dispatch(selectList(null))
  }

  return (
    <View>
      <Pressable
        style={styles.noteCheckbox}
        onPress={() => dispatch(setNoteRequested(!noteRequested))}
      >
        <Checkbox
          color={colors.lightColor}
          onValueChange={() => dispatch(setNoteRequested(!noteRequested))}
          value={noteRequested}
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

      <Pressable onPress={exitHandler} style={styles.closeButton}>
        <Entypo name='cross' size={winWidth * 0.08} color={colors.lightColor} />
      </Pressable>
      <View style={styles.newList}>
        <OptionHolder
          colors={colors}
          option={newListOption(
            () => dispatch(setNewListScreen(true)),
            () => dispatch(setNewList()),
            colors
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
  }
})
