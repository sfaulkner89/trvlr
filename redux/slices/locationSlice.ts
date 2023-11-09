import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LatLng } from 'react-native-maps'
import { Deltas } from 'types/Deltas'
import { PlaceDetails } from '../../types/PlaceDetails'
import initialPosition from '../../assets/config/initialPosition'
import { Member } from '../../types/Member'

type CheckInLocation = {
  location: {
    latitude: number
    longitude: number
  }
  placeId: string
  names: {
    main_text: string
    secondary_text: string
  }
}

const initialState: {
  map: LatLng & Deltas
  browseArea: PlaceDetails[] | null
  nearbyPlace: CheckInLocation | null
  checkInLocation: CheckInLocation | null
  zoom: number
} = {
  map: initialPosition,
  browseArea: null,
  nearbyPlace: null,
  checkInLocation: null,
  zoom: 5
}

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
    },
    setNearbyPlace: (state, action) => {
      console.log(action.payload)
      action.payload.location.latitude = action.payload.location.lat
      action.payload.location.longitude = action.payload.location.lng
      delete action.payload.location.lng
      delete action.payload.location.lat
      void Object.assign(state, { ...state, nearbyPlace: action.payload })
    },
    setCheckInLocation: (state, action) => {
      void Object.assign(state, { ...state, checkInLocation: action.payload })
    },
    setZoom: (state, action: PayloadAction<number>) => {
      void Object.assign(state, { ...state, zoom: action.payload })
    }
  }
})

export const {
  changeMapLocation,
  clearMapLocation,
  setMapBrowseArea,
  clearMapBrowseArea,
  setCheckInLocation,
  setNearbyPlace,
  setZoom
} = locationSlice.actions

export default locationSlice.reducer
