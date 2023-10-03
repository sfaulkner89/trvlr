import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../types/colors'
import { Place } from '../../types/Place'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import { Entypo } from '@expo/vector-icons'
import { PlaceDetails } from 'types/PlaceDetails'

type Props = {
  colors: Colors
  place: PlaceDetails
  setPlaceSelection: (place: PlaceDetails) => void
  setHighlightedPlace: () => void
  isHighlighted: boolean
}

const iconSize = winWidth * 0.04

export default function PlaceComponent ({
  colors,
  place,
  setPlaceSelection,
  setHighlightedPlace,
  isHighlighted
}: Props) {
  let placeTypeDisplay
  placeTypeDisplay =
    place.establishment.types?.length > 0
      ? place.establishment.types[0].slice(0, 1).toUpperCase() +
        place.establishment.types[0].slice(1)
      : undefined
  return (
    <React.Fragment>
      <Pressable
        style={{
          ...styles.container,
          backgroundColor: isHighlighted ? colors.midColor : colors.darkColor
        }}
        onPress={setHighlightedPlace}
      >
        <View style={{ ...styles.textHolder }}>
          <Text
            style={{
              ...styles.displayName,
              color: colors.lightColor
            }}
          >
            {place.name}
            {placeTypeDisplay && (
              <Text style={{ ...styles.placeType }}> - {placeTypeDisplay}</Text>
            )}
          </Text>
          {place.establishment.rating > 0 && (
            <Text style={{ ...styles.notes, color: colors.lightColor }}>
              "{place.establishment.rating}"
            </Text>
          )}
        </View>
        <Pressable
          style={{ ...styles.arrowHolder }}
          onPress={() => setPlaceSelection(place)}
        >
          <Entypo
            name='dots-three-horizontal'
            size={iconSize}
            color={colors.lightColor}
            style={styles.arrow}
          />
        </Pressable>
      </Pressable>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: winHeight * 0.07,
    width: winWidth,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: winWidth * 0.04
  },
  extended: {
    height: winHeight * 0.15,
    width: winWidth
  },
  notes: {}
})
