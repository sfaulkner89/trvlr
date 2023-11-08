import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { List } from '../../types/List'

const initialState = {
  noteToAdd: null,
  listName: null,
  newList: false,
  newListScreen: false,
  noteRequested: false,
  noteScreen: false,
  placeToAdd: true
}

export const listEditorSlice = createSlice({
  name: 'listEditor',
  initialState,
  reducers: {
    setNote: (state, action: PayloadAction<string>) => {
      state.noteToAdd = action.payload
    },
    setListName: (state, action: PayloadAction<string>) => {
      state.listName = action.payload
    },
    setNewList: (state, action: PayloadAction<boolean>) => {
      state.newList = action.payload
    },
    setNewListScreen: (state, action: PayloadAction<boolean>) => {
      state.newListScreen = action.payload
    },
    setNoteRequested: (state, action: PayloadAction<boolean>) => {
      state.noteRequested = action.payload
    },
    setNoteScreen: (state, action: PayloadAction<boolean>) => {
      state.noteScreen = action.payload
    },
    clearPages: state => {
      state.newListScreen = false
      state.noteScreen = false
    },
    setPlaceToAdd: (state, action: PayloadAction<boolean>) => {
      state.placeToAdd = action.payload
    },
    resetListEditor: state => initialState
  }
})

export const {
  setListName,
  setNote,
  setNewList,
  setNewListScreen,
  setNoteRequested,
  setNoteScreen,
  clearPages,
  setPlaceToAdd,
  resetListEditor
} = listEditorSlice.actions

export default listEditorSlice.reducer
