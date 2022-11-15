import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../types/colors'
import { BlurView } from 'expo-blur'
import { Option } from '../../types/Option'
import OptionHolder from './OptionHolder'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import { Place } from '../../types/Place'
import Icon, { default as EnIcon } from 'react-native-vector-icons/Entypo'

type Props = {
  colors: Colors
  options: Option[]
  place: Place
  setPlace: () => void
}

export default function PlaceOptions ({
  colors,
  options,
  place,
  setPlace
}: Props) {
  return (
    <View style={{ ...styles.background, backgroundColor: colors.darkColor }}>
      <View style={{ height: winHeight * 0.05 }}></View>
      <View style={{ ...styles.header, backgroundColor: colors.darkColor }}>
        <Pressable onPress={() => setPlace()}>
          <EnIcon
            name='cross'
            size={winWidth * 0.08}
            color={colors.lightColor}
            style={styles.cross}
          />
        </Pressable>
        <Text style={{ ...styles.name, color: colors.lightColor }}>
          {place.name}
        </Text>
        <View style={{ width: winWidth * 0.2 }}></View>
      </View>
      <ScrollView
        style={{ ...styles.container, backgroundColor: colors.darkColor }}
      >
        {options.map((option, i) => {
          return <OptionHolder option={option} colors={colors} key={i} />
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: winHeight,
    width: winWidth,
    zIndex: 5,
    opacity: 1
  },
  header: {
    height: winHeight * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  name: {
    fontSize: winWidth * 0.06,
    fontWeight: 'bold',
    width: winWidth * 0.55,
    textAlign: 'center'
  },
  cross: {
    width: winWidth * 0.2
  },
  container: {
    position: 'relative',
    flex: 1
  }
})
