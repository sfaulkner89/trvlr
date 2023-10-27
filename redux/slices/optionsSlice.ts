import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const optionsSlice = createSlice({
  name: 'options',
  initialState: {
    optionsVisible: false,
    optionsType: null
  },
  reducers: {
    showOptions: state => {
      console.log('showOptions')
      state.optionsVisible = true
      console.log(state.optionsVisible)
    },
    hideOptions: state => {
      state.optionsVisible = false
    },
    setOptionsType: (state, action: PayloadAction<string>) => {
      state.optionsType = action.payload
    }
  }
})

export const { showOptions, hideOptions } = optionsSlice.actions

export default optionsSlice.reducer
