import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LatLng } from 'react-native-maps'
import { Deltas } from 'types/Deltas'
import { Place } from 'types/Place'
import { PlaceSearchResult } from 'types/PlaceSearchResult'

const initialState: { searchOpen: boolean } = {
  searchOpen: false
}

export const searchSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    closeSearch: state => {
      void Object.assign(state, {
        ...state,
        searchOpen: false
      })
    },
    openSearch: state => {
      void Object.assign(state, {
        ...state,
        searchOpen: true
      })
    }
  }
})

export const { closeSearch, openSearch } = searchSlice.actions

export default searchSlice.reducer
