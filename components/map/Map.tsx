import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import MapView, { Geojson } from 'react-native-maps'
import { Colors } from '../../types/colors'
//import worldJson from '../../assets/countries.json'

const winHeight = Dimensions.get('window').height
const winWidth = Dimensions.get('window').width

type Props = {
  colors: Colors
}

export default function Map ({ colors }: Props) {
  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {/* <Geojson
          geojson={worldJson}
          strokeColor='red'
          fillColor='green'
          strokeWidth={2}
        /> */}
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
