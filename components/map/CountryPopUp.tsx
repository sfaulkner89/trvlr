import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import { Colors } from '../../types/colors'

type Props = {
  colors: Colors
  country: string
}

export default function CountryPopUp ({ colors, country }: Props) {
  return (
    <View style={{ ...styles.container, backgroundColor: colors.midColor }}>
      <Text style={{ ...styles.country, color: colors.lightColor }}>
        {country}
      </Text>
      <Pressable
        style={{
          ...styles.button,
          backgroundColor: colors.lightColor,
          shadowColor: colors.darkColor
        }}
      >
        <Text style={{ ...styles.buttonText, color: colors.darkColor }}>
          Check In
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: winWidth * 0.2,
    width: winHeight * 0.18,
    borderRadius: winWidth * 0.05,
    padding: winWidth * 0.03,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  country: {
    fontWeight: 'bold'
  },
  button: {
    padding: winWidth * 0.015,
    borderRadius: winWidth * 0.02,
    shadowOffset: { height: winWidth * 0.02, width: winWidth * 0.02 }
  },
  buttonText: {}
})
