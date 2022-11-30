import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../types/colors'
import { Place } from '../../types/Place'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import { default as EnIcon } from 'react-native-vector-icons/Entypo'

type Props = {
  colors: Colors
  place: Place
  setPlaceSelection: (place: Place) => void
}

const iconSize = winWidth * 0.04

export default function PlaceComponent ({
  colors,
  place,
  setPlaceSelection
}: Props) {
  const placeTypeDisplay =
    place.placeType.slice(0, 1).toUpperCase() + place.placeType.slice(1)
  return (
    <React.Fragment>
      <View style={{ ...styles.container, backgroundColor: colors.darkColor }}>
        <View style={{ ...styles.textHolder }}>
          <Text style={{ ...styles.displayName, color: colors.lightColor }}>
            {place.displayName}
            <Text style={{ ...styles.placeType }}> - {placeTypeDisplay}</Text>
          </Text>
          <Text style={{ ...styles.notes, color: colors.lightColor }}>
            "{place.notes}"
          </Text>
        </View>
        <Pressable
          style={{ ...styles.arrowHolder }}
          onPress={() => setPlaceSelection(place)}
        >
          <EnIcon
            name='dots-three-horizontal'
            size={iconSize}
            color={colors.lightColor}
            style={styles.arrow}
          />
        </Pressable>
      </View>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: winHeight * 0.07,
    width: winWidth,
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: winHeight * 0.0015
  },
  textHolder: {
    marginLeft: winWidth * 0.05,
    maxWidth: winWidth * 0.85
  },
  displayName: {
    fontWeight: 'bold'
  },
  placeType: {
    fontWeight: 'normal'
  },
  arrow: {},
  arrowHolder: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: winWidth * 0.02
  },
  extended: {
    height: winHeight * 0.15,
    width: winWidth
  },
  notes: {}
})
