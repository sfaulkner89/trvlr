import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import { default as IoIcon } from 'react-native-vector-icons/Ionicons'
import { Colors } from '../../types/colors'
import { PlaceDetails } from '../../types/PlaceDetails'
import { Deltas } from '../../types/Deltas'

type Props = {
  colors: Colors
  placeDetails: PlaceDetails[]
  deltas: Deltas
}

export default function MapPin ({ colors, placeDetails, deltas }) {
  const deltaSum = deltas.latitudeDelta + deltas.longitudeDelta
  console.log(deltaSum)
  const granularity =
    deltaSum > 40 ? 4 : deltaSum > 15 ? 3 : deltaSum > 8 ? 2 : 1
  return (
    <React.Fragment>
      {placeDetails ? (
        <View style={{ ...styles.infoBox, backgroundColor: colors.midColor }}>
          <Text style={{ ...styles.placeName, color: colors.lightColor }}>
            {placeDetails.length < 2
              ? "Can't check in here"
              : placeDetails.length < granularity
              ? placeDetails[placeDetails.length - 1]
              : placeDetails[granularity].long_name}
          </Text>
          <View style={styles.buttonHolder}>
            <Pressable
              style={{
                ...styles.button,
                backgroundColor: colors.selectedColor
              }}
            >
              <Text style={{ ...styles.buttonText, color: colors.darkColor }}>
                Check In
              </Text>
            </Pressable>
            <Pressable
              style={{
                ...styles.button,
                backgroundColor: colors.selectedColor
              }}
            >
              <Text style={{ ...styles.buttonText, color: colors.darkColor }}>
                Create List
              </Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View />
      )}
      <IoIcon name='pin-sharp' style={styles.pin} size={winWidth * 0.1} />
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  pin: {
    position: 'absolute',
    zIndex: 20,
    top: winHeight * 0.5,
    left: winWidth * 0.5
  },
  infoBox: {
    position: 'absolute',
    zIndex: 20,
    top: winHeight * 0.4,
    left: winWidth * 0.38,
    width: winWidth * 0.34,
    height: winHeight * 0.1,
    translateX: winWidth * 0.1,
    translateY: winHeight * 0.07,
    padding: 0,
    borderRadius: winWidth * 0.05,
    alignItems: 'center',
    justifyContent: 'center'
  },
  placeName: {},
  button: {
    flex: 1,
    margin: winWidth * 0.02,
    padding: winWidth * 0.01,
    borderRadius: winWidth * 0.02,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: winWidth * 0.025,
    textAlign: 'center'
  },
  buttonHolder: {
    flexDirection: 'row'
  }
})
