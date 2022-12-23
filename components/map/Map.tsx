import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import MapView, { LatLng } from 'react-native-maps'
import { Colors } from '../../types/colors'
import getMapAreaName from '../../handlers/googleServices/getMapAreaName'

import { winHeight, winWidth } from '../../assets/variables/height-width'
import MapPin from './MapPin'
import { Deltas } from '../../types/Deltas'
import initialPosition from '../../assets/config/initialPosition'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  changeMapLocation,
  clearMapBrowseArea,
  setMapBrowseArea
} from '../../redux/slices/locationSlice'
import { clearSelectedPlace } from '../../redux/slices/resultsSlice'

type Props = {
  colors: Colors
}

export default function Map ({ colors }: Props) {
  const [deltas, setDeltas] = useState<Deltas | undefined>({
    latitudeDelta: 180,
    longitudeDelta: 180
  })
  const dispatch = useAppDispatch()
  const mapPosition = useAppSelector(state => state.location.map)
  const areaNames = useAppSelector(state => state.location.browseArea)
  const selectedPlace = useAppSelector(state => state.results.selectedPlace)

  const [position, setPosition] = useState<LatLng & Deltas>(initialPosition)

  const moveHandler = async () => {
    const placeDetails = await getMapAreaName(position)
    setDeltas({
      latitudeDelta: position.latitudeDelta,
      longitudeDelta: position.longitudeDelta
    })
    dispatch(changeMapLocation(position))
    dispatch(setMapBrowseArea(placeDetails))
  }

  const touchHandler = () => {
    dispatch(clearMapBrowseArea())
    dispatch(clearSelectedPlace())
  }

  return (
    <View style={styles.container}>
      <MapPin
        colors={colors}
        areaNames={areaNames}
        deltas={deltas}
        selectedPlace={selectedPlace}
      />
      <MapView
        style={styles.map}
        region={mapPosition}
        onRegionChange={e => setPosition(e)}
        onTouchEnd={() => moveHandler()}
        onTouchMove={() => touchHandler()}
      ></MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width: winWidth,
    height: winHeight
  }
})
