import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { List } from '../../types/List'

export const listSlice = createSlice({
  name: 'list',
  initialState: {
    newList: false,
    existingList: true,
    selectedList: null,
    addToList: false,
    noteRequested: false,
    noteScreen: false,
    listEdit: false
  },
  reducers: {
    showNewList: state => {
      state.newList = true
    },
    hideNewList: state => {
      state.newList = false
    },
    showAddToList: (state, action: PayloadAction<List>) => {
      state.addToList = true
    },
    hideAddToList: state => {
      state.addToList = false
    },
    selectList: (state, action: PayloadAction<List>) => {
      state.selectedList = action.payload
    },
    deselectList: state => {
      state.selectedList = null
    },
    toggleNote: state => {
      state.noteRequested = !state.noteRequested
    },

    showNoteScreen: state => {
      state.noteScreen = true
    },
    hideNoteScreen: state => {
      state.noteScreen = false
    },
    isExistingList: state => {
      state.existingList = true
    },
    isNotExistingList: state => {
      state.existingList = false
    },
    setListEdit: (state, action: PayloadAction<boolean>) => {
      state.listEdit = action.payload
    }
  }
})

export const {
  showNewList,
  hideNewList,
  showAddToList,
  hideAddToList,
  selectList,
  deselectList,
  toggleNote,
  showNoteScreen,
  hideNoteScreen,
  isExistingList,
  isNotExistingList,
  setListEdit
} = listSlice.actions

export default listSlice.reducer
