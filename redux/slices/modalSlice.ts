import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { List } from '../../types/List'

export const modalSlice = createSlice({
  name: 'modals',
  initialState: {
    mapToast: null
  },
  reducers: {
    setMapToast: (state, action: PayloadAction<string>) => {
      state.mapToast = action.payload
    },
    clearMapToast: state => {
      state.mapToast = null
    }
  }
})

export const { setMapToast, clearMapToast } = modalSlice.actions

export default modalSlice.reducer
