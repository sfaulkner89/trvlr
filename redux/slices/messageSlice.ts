import { createSlice } from '@reduxjs/toolkit'
import { MessagingGroup } from '../../types/MessagingGroup'

export const messageSlice = createSlice({
  name: 'message',
  initialState: {
    chat: null
  },
  reducers: {
    setChat: (state, action: { payload: MessagingGroup }) => {
      state.chat = action.payload
    },
    unsetChat: state => {
      state.chat = null
    }
  }
})

export const { setChat } = messageSlice.actions

export default messageSlice.reducer
