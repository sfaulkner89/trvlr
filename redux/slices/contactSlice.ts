import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MessagingGroup } from 'types/MessagingGroup'
import { Member } from '../../types/Member'

export const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    contactMarker: null,
    selectedContact: null,
    pageNumber: 0
  },
  reducers: {
    setContacts: (
      state,
      action: PayloadAction<Member & { messages: Message[] }[]>
    ) => Object.assign(state, action.payload),
    setContact: (state, action: PayloadAction<Member>) => {
      state.selectedContact = action.payload
    },
    clearContact: state => {
      state.selectedContact = null
      state.pageNumber = 0
    },
    changePageNumber: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload
    },
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
  changePageNumber,
  setContacts,
  contactMarkerVisible
} = contactSlice.actions

export default contactSlice.reducer
