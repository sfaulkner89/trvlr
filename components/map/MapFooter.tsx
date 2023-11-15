import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PlaceAddedModal from './PlaceAddedModal'
import { setSelectedPlace } from '../../redux/slices/resultsSlice'
import getPlaceDetails from '../../handlers/googleServices/getPlaceDetails'
import {
  changeMapLocation,
  setMapBrowseArea,
  setNearbyPlace
} from '../../redux/slices/locationSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import getMapAreaName from '../../handlers/googleServices/getMapAreaName'
import nearbySearch from '../../handlers/googleServices/nearbySearch'
import { PlaceSearchResult } from '../../types/PlaceSearchResult'
import { Entypo } from '@expo/vector-icons'
import PlaceInfoModal from './PlaceInfoModal'
import { PlaceDetails } from '../../types/PlaceDetails'
import { winWidth } from '../../assets/variables/height-width'

export default function MapFooter () {
  const dispatch = useAppDispatch()

  const checkInLocation = useAppSelector(
    state => state.location.checkInLocation
  )
  const modalMessage = useAppSelector(state => state.modals.mapToast)
  const colors = useAppSelector(state => state.colors)
  const nearbyPlace: PlaceSearchResult = useAppSelector(
    state => state.location.nearbyPlace
  )
  const selectedPlace: PlaceDetails = useAppSelector(
    state => state.results.selectedPlace
  )

  const homeHandler = async () => {
    const position = {
      longitude: checkInLocation.location.longitude,
      latitude: checkInLocation.location.latitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005
    }
    dispatch(changeMapLocation(position))
    const placeDetails = await getMapAreaName(position)
    dispatch(setMapBrowseArea(placeDetails))
    const result: PlaceSearchResult | void = await nearbySearch(position)
    if (result) {
      dispatch(setNearbyPlace(result))
      const details = await getPlaceDetails(result)
      dispatch(
        setSelectedPlace({ ...result, ...details, placeId: result.placeId })
      )
    }
  }

  return (
    <View style={styles.bottomModals}>
      <PlaceAddedModal modalMessage={modalMessage} />
      <View style={styles.buttonHolder}>
        {checkInLocation && (
          <Pressable
            onPress={homeHandler}
            style={{ ...styles.button, backgroundColor: colors.darkColor }}
          >
            <Entypo name='home' size={24} color={colors.lightColor} />
          </Pressable>
        )}
      </View>

      {nearbyPlace && selectedPlace && <PlaceInfoModal />}
    </View>
  )
}

const styles = StyleSheet.create({
  bottomModals: {
    width: winWidth,
    zIndex: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
  buttonHolder: {
    width: winWidth * 0.9,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: winWidth * 0.05
  },
  button: {
    opacity: 0.8,
    padding: winWidth * 0.02,
    borderRadius: winWidth * 0.06
  }
})
