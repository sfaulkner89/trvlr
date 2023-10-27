import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { List } from '../../types/List'

export const listSlice = createSlice({
  name: 'list',
  initialState: {
    newList: false,
    selectedList: null,
    addToList: false
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
    }
  }
})

export const {
  showNewList,
  hideNewList,
  showAddToList,
  hideAddToList,
  selectList,
  deselectList
} = listSlice.actions

export default listSlice.reducer
