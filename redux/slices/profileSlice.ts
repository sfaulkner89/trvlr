import { createSlice, PayloadAction } from '@reduxjs/toolkit'
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

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Member>) =>
      Object.assign(state, action.payload),
    clearProfile: state => Object.assign(state, initialState)
  }
})

export const { setProfile, clearProfile } = profileSlice.actions

export default profileSlice.reducer
