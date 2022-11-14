import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../types/colors'
import { button } from '../../types/button'

const winHeight = Dimensions.get('window').height
const winWidth = Dimensions.get('window').width

type Props = {
  colors: Colors
  buttonList: button[]
  selection: number
  setSelection: (selection: number) => void
}

export default function SearchSelector ({
  colors,
  buttonList,
  selection,
  setSelection
}: Props) {
  return (
    <View style={{ ...styles.container, backgroundColor: colors.midColor }}>
      {buttonList.map((crit, i) => {
        const buttonName =
          crit.name.slice(0, 1).toUpperCase() + crit.name.slice(1)
        return (
          <Pressable
            onPress={() => setSelection(i)}
            key={i}
            style={{
              ...styles.button,
              backgroundColor:
                i === selection ? colors.lightColor : colors.midColor
            }}
          >
            <Text
              key={i}
              style={{
                ...styles.buttonLabel,
                color: i === selection ? colors.darkColor : colors.lightColor
              }}
            >
              {buttonName}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: winHeight * 0.04,
    marginTop: winHeight * 0.01,
    flexDirection: 'row',
    width: winWidth * 0.9,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: winWidth * 0.2
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: winHeight * 0.04,
    borderRadius: winWidth * 0.06
  },
  buttonLabel: {
    fontSize: winWidth * 0.04
  }
})
