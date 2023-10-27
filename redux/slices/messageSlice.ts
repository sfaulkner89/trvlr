import { createSlice } from '@reduxjs/toolkit'
import { MessagingGroup } from '../../types/MessagingGroup'

export const messageSlice = createSlice({
  name: 'message',
  initialState: {
    chatPage: false
  },
  reducers: {
    showChatPage: state => {
      state.chatPage = true
    },
    hideChatPage: state => {
      state.chatPage = false
    }
  }
})

export const { showChatPage, hideChatPage } = messageSlice.actions

export default messageSlice.reducer
