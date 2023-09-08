import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { List } from '../../types/List'
import { Member } from '../../types/Member'

const initialState = {
  id: '',
  username: '',
  displayName: '',
  bio: '',
  profilePicture: '',
  countries: '',
  following: [],
  followers: [],
  lists: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Member>) =>
      Object.assign(state, action.payload),
    clearUser: state => Object.assign(state, initialState),
    setLists: (state, action: PayloadAction<List[]>) =>
      Object.assign(state, { lists: action.payload })
  }
})

export const { setUser, clearUser, setLists } = userSlice.actions

export default userSlice.reducer
