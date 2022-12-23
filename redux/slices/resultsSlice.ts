import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LatLng } from 'react-native-maps'
import { Deltas } from 'types/Deltas'
import { Place } from 'types/Place'
import { PlaceSearchResult } from 'types/PlaceSearchResult'

const initialState: { mapSearch: PlaceSearchResult[]; selectedPlace: Place } = {
  mapSearch: null,
  selectedPlace: null
}

export const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    changePlaceResults: (state, action) => {
      void Object.assign(state, { ...state, mapSearch: action.payload })
    },
    clearPlaceResults: state =>
      void Object.assign(state, {
        ...state,
        mapSearch: initialState.mapSearch
      }),
    setSelectedPlace: (state, action) => {
      void Object.assign(state, { ...state, selectedPlace: action.payload })
    },
    clearSelectedPlace: state => {
      void Object.assign(state, {
        ...state,
        selectedPlace: initialState.selectedPlace
      })
    }
  }
})

export const {
  changePlaceResults,
  clearPlaceResults,
  setSelectedPlace,
  clearSelectedPlace
} = resultsSlice.actions

export default resultsSlice.reducer
