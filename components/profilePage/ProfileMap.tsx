import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from 'react-simple-maps'
import * as Svg from 'react-native-svg'
import countries from '../../assets/countries-50m.json'

export default function ProfileMap () {
  return (
    <View style={styles.container}>
      <ComposableMap>
        <ZoomableGroup>
          <Geographies geography='../../assets/countries-50m.json'>
            {(geographies, projection) =>
              geographies.map((geography, i) => (
                <Geography
                  key={i}
                  geography={geography}
                  projection={projection}
                  style={{
                    default: {
                      fill: '#ECEFF1',
                      stroke: '#607D8B',
                      strokeWidth: 0.75,
                      outline: 'none'
                    },
                    hover: {
                      fill: '#607D8B',
                      stroke: '#607D8B',
                      strokeWidth: 0.75,
                      outline: 'none'
                    },
                    pressed: {
                      fill: '#FF5722',
                      stroke: '#607D8B',
                      strokeWidth: 0.75,
                      outline: 'none'
                    }
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
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
