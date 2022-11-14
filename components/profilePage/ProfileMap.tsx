import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'
import { winHeight, winWidth } from '../../assets/height-width'

export default function ProfileMap () {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 0,
          longitude: -60,
          latitudeDelta: 180,
          longitudeDelta: 180
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: winHeight,
    width: winWidth
  },
  map: {
    flex: 1
  }
})
