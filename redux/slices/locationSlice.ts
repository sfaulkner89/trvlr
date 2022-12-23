import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LatLng } from 'react-native-maps'
import { Deltas } from 'types/Deltas'
import { PlaceDetails } from 'types/AreaNames'
import initialPosition from '../../assets/config/initialPosition'
import { Member } from '../../types/Member'

const initialState: {
  map: LatLng & Deltas
  browseArea: PlaceDetails[] | null
} = { map: initialPosition, browseArea: null }

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    changeMapLocation: (state, action) =>
      void Object.assign(state.map, action.payload),
    clearMapLocation: state =>
      void Object.assign(state, { ...state, map: initialState.map }),
    setMapBrowseArea: (state, action) => {
      void Object.assign(state, { ...state, browseArea: action.payload })
    },
    clearMapBrowseArea: state => {
      void Object.assign(state, { ...state, browseArea: null })
    }
  }
})

export const {
  changeMapLocation,
  clearMapLocation,
  setMapBrowseArea,
  clearMapBrowseArea
} = locationSlice.actions

export default locationSlice.reducer
