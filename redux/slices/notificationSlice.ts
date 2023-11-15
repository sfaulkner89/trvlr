import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MessagingGroup } from '../../types/MessagingGroup'

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    pushToken: null,
    notificationScreen: false
  },
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.pushToken = action.payload
    },
    setNotificationScreen: (state, action: PayloadAction<boolean>) => {
      state.notificationScreen = action.payload
    }
  }
})

export const { setToken, setNotificationScreen } = notificationSlice.actions

export default notificationSlice.reducer
