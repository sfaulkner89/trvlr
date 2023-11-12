import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { List } from '../../types/List'
import { MessagingGroup } from '../../types/MessagingGroup'

const initialState: {
  groups: MessagingGroup[]
  selectedGroup: MessagingGroup | null
} = {
  groups: [],
  selectedGroup: null
}

export const messagingGroupSlice = createSlice({
  name: 'messagingGroups',
  initialState,
  reducers: {
    setMessagingGroups: (state, action: PayloadAction<MessagingGroup[]>) => {
      void Object.assign(state, { ...state, messagingGroups: action.payload })
    },
    updateMessagingGroup: (
      state,
      action: PayloadAction<{ id: string; messages: Message[] }>
    ) => {
      const index = state.groups.findIndex(
        group => group.id === action.payload.id
      )
      if (index !== -1) {
        state.groups[index].messages = action.payload.messages
      }
      selectMessagingGroup(state, state.groups[index])
    },
    selectMessagingGroup: (
      state,
      action: PayloadAction<MessagingGroup | null>
    ) => {
      void Object.assign(state, { ...state, selectedGroup: action.payload })
    }
  }
})

export const {
  setMessagingGroups,
  selectMessagingGroup,
  updateMessagingGroup
} = messagingGroupSlice.actions

export default messagingGroupSlice.reducer
