import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { colors } from '../../SubApp'

export const colorSlice = createSlice({
  name: 'colors',
  initialState: colors,
  reducers: {}
})

export const {} = colorSlice.actions

export default colorSlice.reducer
