import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { PlaceDetails } from '../../types/PlaceDetails'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import { Entypo } from '@expo/vector-icons'

import { setNote, setNoteScreen } from '../../redux/slices/listEditorSlice'

type Props = {
  submitHandler: () => void
}

export default function NoteInputScreen ({ submitHandler }: Props) {
  const list = useAppSelector(state => state.list.selectedList)
  const colors = useAppSelector(state => state.colors)
  const listName = useAppSelector(state => state.listEditor.listName)

  const selectedPlace: PlaceDetails = useAppSelector(
    state => state.results.selectedPlace
  )
  const note = useAppSelector(state => state.listEditor.noteToAdd)
  const dispatch = useAppDispatch()

  const exitHandler = () => {
    dispatch(setNoteScreen(false))
  }

  return (
    <View style={{ ...container, backgroundColor: colors.midColor }}>
      <Pressable onPress={exitHandler} style={closeButton}>
        <Entypo name='cross' size={winWidth * 0.08} color={colors.lightColor} />
      </Pressable>
      <Text style={{ ...headerText, color: colors.lightColor }}>
        Add Note for {selectedPlace.name} in{' '}
        {list?.displayName ? list.displayName : listName}
      </Text>
      <TextInput
        multiline
        autoFocus
        onChangeText={e => dispatch(setNote(e))}
        value={note}
        style={{ ...noteInput, backgroundColor: 'white' }}
      />
      <Pressable
        style={{ ...submitButton, backgroundColor: colors.darkColor }}
        onPress={submitHandler}
      >
        <Text style={{ ...submitButtonText, color: colors.lightColor }}>
          Submit
        </Text>
      </Pressable>
    </View>
  )
}

const {
  container,
  noteInput,
  headerText,
  submitButton,
  submitButtonText,
  closeButton
} = StyleSheet.create({
  container: {
    flex: 1,
    width: winWidth,
    alignItems: 'center',
    justifyContent: 'center'
  },
  noteInput: {
    width: winWidth * 0.8,
    height: winHeight * 0.2,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    margin: 10
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  submitButton: {
    width: winWidth * 0.8,
    height: winHeight * 0.05,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  submitButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  closeButton: {
    position: 'absolute',
    top: winHeight * 0.05,
    right: winWidth * 0.05,
    zIndex: 10000
  }
})
