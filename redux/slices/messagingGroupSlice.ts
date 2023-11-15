import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { List } from '../../types/List'
import { Member } from '../../types/Member'
import { MessagingGroup } from '../../types/MessagingGroup'

const initialState: {
  groups: MessagingGroup[]
  selectedGroup: MessagingGroup | null
} = {
  groups: [],
  selectedGroup: null
}

type ShallowMessagingGroup = {
  id: string
  messages: Message[]
  dateCreated: string
  dateModified: string
}

export const messagingGroupSlice = createSlice({
  name: 'messagingGroups',
  initialState,
  reducers: {
    setMessagingGroups: (state, action: PayloadAction<MessagingGroup[]>) => {
      void Object.assign(state, { ...state, groups: action.payload })
    },
    setMessagingGroupsShallow: (
      state,
      action: PayloadAction<ShallowMessagingGroup>
    ) => {
      const alteredGroup = state.groups.find(g => g?.id === action.payload.id)

      if (alteredGroup) {
        alteredGroup.messages = action.payload.messages
        alteredGroup.dateModified = action.payload.dateModified
        void Object.assign(state.groups, [...state.groups])
      } else {
        void Object.assign(state.groups, [...state.groups, alteredGroup])
      }
    },
    setLastUpdated: (state, action: PayloadAction<Date>) => {
      void Object.assign(state, { ...state, lastUpdated: action.payload })
    },
    updateMessagingGroup: (
      state,
      action: PayloadAction<ShallowMessagingGroup>
    ) => {
      if (action.payload.id === state.selectedGroup?.id) {
        void Object.assign(state, {
          ...state,
          selectedGroup: {
            ...state.selectedGroup,
            messages: action.payload.messages,
            dateModified: action.payload.dateModified
          }
        })
      }
    },
    selectMessagingGroup: (
      state,
      action: PayloadAction<MessagingGroup | null>
    ) => {
      void Object.assign(state, { ...state, selectedGroup: action.payload })
    },
    selectOrCreateMessagingGroup: (state, action: PayloadAction<Member>) => {
      const existingGroup = state.groups.find(g =>
        g.members.map(m => m.id).includes(action.payload.id)
      )
      if (existingGroup) {
        void Object.assign(state, { ...state, selectedGroup: existingGroup })
      } else {
        const newGroup = {
          id: action.payload.id,
          name: null,
          members: [action.payload],
          messages: []
        }
        void Object.assign(state, { ...state, selectedGroup: newGroup })
      }
    },
    addMessagingGroup: (state, action: PayloadAction<MessagingGroup>) => {
      void Object.assign(state, {
        ...state,
        groups: [...state.groups, action.payload]
      })
    }
  }
})

export const {
  setMessagingGroups,
  selectMessagingGroup,
  updateMessagingGroup,
  setLastUpdated,
  setMessagingGroupsShallow,
  selectOrCreateMessagingGroup,
  addMessagingGroup
} = messagingGroupSlice.actions

export default messagingGroupSlice.reducer
