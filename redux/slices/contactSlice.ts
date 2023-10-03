import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MessagingGroup } from 'types/MessagingGroup'
import { Member } from '../../types/Member'

export const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    contactMarker: null,
    contacts: []
  },
  reducers: {
    setContacts: (
      state,
      action: PayloadAction<Member & { messages: Message[] }[]>
    ) => Object.assign(state, action.payload),
    setContact: (state, action: PayloadAction<MessagingGroup>) => {
      Object.assign(state.contacts[action.payload.id], action.payload.messages)
    },
    addMessage: (state, action: PayloadAction<Message>) =>
      Object.assign(state, [...state.contacts, action.payload]),
    clearContact: state => Object.assign(state, {}),
    contactMarkerVisible: (state, action: PayloadAction<Member>) => {
      state.contactMarker = action.payload
    },
    contactMarkerInvisible: state => {
      state.contactMarker = null
    }
  }
})

export const {
  setContact,
  clearContact,
  addMessage,
  setContacts,
  contactMarkerVisible
} = contactSlice.actions

export default contactSlice.reducer
