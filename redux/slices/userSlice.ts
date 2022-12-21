import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Member } from '../../types/Member'

const initialState = {
  id: '',
  username: '',
  displayName: '',
  bio: '',
  profilePicture: '',
  countries: '',
  following: '',
  followers: '',
  lists: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Member>) =>
      Object.assign(state, action.payload),
    clearUser: state => Object.assign(state, initialState)
  }
})

export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer
