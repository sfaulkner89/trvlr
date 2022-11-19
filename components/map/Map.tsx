import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useState } from 'react'
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
const jb = require('../../assets/download.jpg')

const winHeight = Dimensions.get('window').height
const winWidth = Dimensions.get('window').width

type Props = {
  colors: Colors
}

export default function Map ({ colors }: Props) {
  const [country, setCountry] = useState<string | undefined>()
  const [clickCoords, setClickCoords] = useState<LatLng | undefined>()
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onPress={e => setClickCoords(e.nativeEvent.coordinate)}
      >
        <Geojson
          geojson={worldJson}
          strokeColor='transparent'
          fillColor='transparent'
          strokeWidth={2}
          onPress={e => setCountry(e.feature.properties.NAME)}
        />
        {country && clickCoords ? (
          <Marker coordinate={clickCoords}>
            <Callout tooltip>
              <CountryPopUp colors={colors} country={country} />
            </Callout>
          </Marker>
        ) : (
          <View />
        )}
      </MapView>
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
