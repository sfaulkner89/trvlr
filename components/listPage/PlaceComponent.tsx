import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../types/colors'
import { Place } from '../../types/Place'
import { winHeight, winWidth } from '../../assets/height-width'
import { default as AnIcon } from 'react-native-vector-icons/AntDesign'

type Props = {
  colors: Colors
  place: Place
}

const iconSize = winWidth * 0.04

export default function PlaceComponent ({ colors, place }: Props) {
  const [extend, setExtend] = useState(false)
  const placeTypeDisplay =
    place.placeType.slice(0, 1).toUpperCase() + place.placeType.slice(1)
  return (
    <React.Fragment>
      <Pressable
        onPress={() => setExtend(!extend)}
        style={{ ...styles.container, backgroundColor: colors.darkColor }}
      >
        <View style={{ ...styles.textHolder }}>
          <Text style={{ ...styles.name, color: colors.lightColor }}>
            {place.name}
            <Text style={{ ...styles.placeType }}> - {placeTypeDisplay}</Text>
          </Text>
          <Text style={{ ...styles.notes, color: colors.lightColor }}>
            "{place.notes}"
          </Text>
        </View>
        <View style={{ ...styles.arrowHolder }}>
          <AnIcon
            name={extend ? 'down' : 'right'}
            size={iconSize}
            color={colors.lightColor}
            style={styles.arrow}
          />
        </View>
      </Pressable>
      {extend ? (
        <View
          style={{ ...styles.extended, backgroundColor: colors.midColor }}
        ></View>
      ) : (
        <View />
      )}
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
  name: {
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
