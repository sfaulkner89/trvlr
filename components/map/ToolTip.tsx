import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import localeSelector from '../../assets/tools/localeSelector'

import { winHeight, winWidth } from '../../assets/variables/height-width'
import { AreaNames } from '../../types/AreaNames'
import { Deltas } from '../../types/Deltas'
import { PlaceDetails } from '../../types/PlaceDetails'
import { Colors } from '../../types/colors'

type Props = {
  isCurrentUser: true
  areaNames: AreaNames[]
  selectedPlace: PlaceDetails
  deltas: Deltas
  colors: Colors
  setNewList: (set: boolean) => void
  setAddToList: (set: boolean) => void
  onCheckInPress: () => void
}

export default function ToolTip ({
  areaNames,
  selectedPlace,
  deltas,
  colors,
  setNewList,
  setAddToList,
  onCheckInPress
}: Props) {
  if (areaNames && !selectedPlace)
    return (
      <View style={{ ...styles.infoBox, backgroundColor: colors.midColor }}>
        <Text style={{ ...styles.placeName, color: colors.lightColor }}>
          {localeSelector(areaNames, deltas)}
        </Text>
        <View style={styles.buttonHolder}>
          <Pressable
            style={{
              ...styles.button,
              backgroundColor: colors.selectedColor
            }}
            onPress={onCheckInPress}
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
            onPress={() => setNewList(true)}
          >
            <Text style={{ ...styles.buttonText, color: colors.darkColor }}>
              Create List
            </Text>
          </Pressable>
        </View>
      </View>
    )
  if (selectedPlace)
    return (
      <View style={{ ...styles.infoBox, backgroundColor: colors.midColor }}>
        <Text style={{ ...styles.placeName, color: colors.lightColor }}>
          {selectedPlace.name}
        </Text>
        <View style={styles.buttonHolder}>
          <Pressable
            onPress={onCheckInPress}
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
            onPress={() => setAddToList(true)}
          >
            <Text style={{ ...styles.buttonText, color: colors.darkColor }}>
              Add To List
            </Text>
          </Pressable>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  pin: {
    position: 'absolute',
    zIndex: 20,
    top: winHeight * 0.5,
    left: winWidth * 0.5
    // height: 40,
    // width: 40,
    // transform: [{ translateX: -20 }, { translateY: -20 }]
  },
  infoBox: {
    position: 'absolute',
    zIndex: 20,
    top: winHeight * 0.39,
    left: winWidth * 0.2,
    width: winWidth * 0.64,
    height: winHeight * 0.1,
    translateX: winWidth * 0.25,
    translateY: winHeight * 0.07,
    padding: 10,
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
    justifyContent: 'center',
    height: winHeight * 0.04
  },
  buttonText: {
    fontSize: winWidth * 0.035,
    textAlign: 'center'
  },
  buttonHolder: {
    flexDirection: 'row'
  }
})
