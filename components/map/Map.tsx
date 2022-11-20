import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import MapView, {
  Callout,
  Geojson,
  LatLng,
  Marker,
  Overlay
} from 'react-native-maps'
import { Colors } from '../../types/colors'
import worldJson from '../../assets/110m.json'
import CountryPopUp from './CountryPopUp'
import getMapAreaName from '../../handlers/googleServices/getMapAreaName'

import { winHeight, winWidth } from '../../assets/variables/height-width'
import { PlaceDetails } from '../../types/PlaceDetails'
import MapPin from './MapPin'
import { Deltas } from '../../types/Deltas'

type Props = {
  colors: Colors
}

export default function Map ({ colors }: Props) {
  const [placeInfo, setPlaceInfo] = useState<PlaceDetails[] | undefined>()
  const [deltas, setDeltas] = useState<Deltas | undefined>({
    latitudeDelta: 180,
    longitudeDelta: 180
  })

  const positionRef = useRef<LatLng & Deltas>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 180,
    longitudeDelta: 180
  })
  const mapRef = useRef()

  const moveHandler = async () => {
    const placeDetails = await getMapAreaName(positionRef.current)
    setDeltas({
      latitudeDelta: positionRef.current.latitudeDelta,
      longitudeDelta: positionRef.current.longitudeDelta
    })
    setPlaceInfo(placeDetails)
  }

  return (
    <View style={styles.container}>
      <MapPin colors={colors} placeDetails={placeInfo} deltas={deltas} />
      <MapView
        style={styles.map}
        onRegionChange={e => (positionRef.current = e)}
        onTouchEnd={() => moveHandler()}
        onTouchMove={() => setPlaceInfo(undefined)}
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
