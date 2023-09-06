import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MessagingGroup } from 'types/MessagingGroup'
import { Member } from '../../types/Member'

export const contactSlice = createSlice({
  name: 'contact',
  initialState: [],
  reducers: {
    setContacts: (
      state,
      action: PayloadAction<Member & { messages: Message[] }[]>
    ) => Object.assign(state, action.payload),
    setContact: (
      state,
      action: PayloadAction<Member & { messages: Message[] }>
    ) => {
      console.log('ID', action.payload)
      Object.assign(state[action.payload.id], action.payload.messages)
    },
    addMessage: (state, action: PayloadAction<Message>) =>
      Object.assign(state, [...state, action.payload]),
    clearContact: state => Object.assign(state, {})
  }
})

export const { setContact, clearContact, addMessage, setContacts } =
  contactSlice.actions

export default contactSlice.reducer
