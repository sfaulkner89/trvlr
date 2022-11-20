import { StyleSheet, Text, View } from 'react-native'
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
    deltaSum > 60 ? 4 : deltaSum > 20 ? 3 : deltaSum > 5 ? 2 : 1
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
    top: winHeight * 0.43,
    left: winWidth * 0.425,
    width: winWidth * 0.25,
    height: winHeight * 0.07,
    translateX: winWidth * 0.1,
    translateY: winHeight * 0.07,
    padding: winWidth * 0.02,
    borderRadius: winWidth * 0.05,
    alignItems: 'center',
    justifyContent: 'center'
  },
  placeName: {}
})
