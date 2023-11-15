import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { List } from '../../types/List'
import { Member } from '../../types/Member'
import { Place } from '../../types/Place'

const initialState = {
  optionsType: null,
  nameChange: null,
  optionsTarget: null
}

export const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setOptionsType: (state, action: PayloadAction<string>) => {
      state.optionsType = action.payload
    },
    setNameChange: (state, action: PayloadAction<string>) => {
      state.nameChange = action.payload
    },
    setOptionsTarget: (state, action: PayloadAction<Member | List | Place>) => {
      state.optionsTarget = action.payload
    },
    clearOptions: state => {
      void Object.assign(state, initialState)
    }
  }
})

export const { setOptionsType, setNameChange, setOptionsTarget, clearOptions } =
  optionsSlice.actions

export default optionsSlice.reducer
