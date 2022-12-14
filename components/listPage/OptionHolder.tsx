import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Option } from '../../types/Option'
import { Colors } from '../../types/colors'
import { winHeight, winWidth } from '../../assets/variables/height-width'

type Props = {
  colors: Colors
  option: Option
}

export default function OptionHolder ({ colors, option }: Props) {
  return (
    <Pressable
      style={{ ...styles.container, backgroundColor: colors.midColor }}
      onPress={option.onPress}
    >
      <View style={styles.contentHolder}>
        <>{option.icon}</>
        <Text style={{ ...styles.title, color: colors.lightColor }}>
          {option.title}
        </Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    height: winHeight * 0.1,
    width: winWidth,
    flexDirection: 'row',
    marginTop: winHeight * 0.0015,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1
  },
  contentHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: winWidth * 0.4
  },
  title: {
    fontSize: winWidth * 0.04
  }
})
