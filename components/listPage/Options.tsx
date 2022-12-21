import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../types/colors'
import { BlurView } from 'expo-blur'
import { Option } from '../../types/Option'
import OptionHolder from './OptionHolder'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import { Place } from '../../types/Place'
import Icon, { default as EnIcon } from 'react-native-vector-icons/Entypo'
import { Member } from '../../types/Member'
import { List } from '../../types/List'

type Props = {
  colors: Colors
  options: Option[]
  selection: List | Member | Place
  setSelection:
    | ((list?: List) => void)
    | ((place?: Place) => void)
    | ((member?: Member) => void)
}

export default function Options ({
  colors,
  options,
  selection,
  setSelection
}: Props) {
  return (
    <View style={{ ...styles.background, backgroundColor: colors.darkColor }}>
      <View style={{ height: winHeight * 0.05 }}></View>
      <View style={{ ...styles.header, backgroundColor: colors.darkColor }}>
        <Pressable onPress={() => setSelection()}>
          <EnIcon
            name='cross'
            size={winWidth * 0.08}
            color={colors.lightColor}
            style={styles.cross}
          />
        </Pressable>
        <Text style={{ ...styles.name, color: colors.lightColor }}>
          {selection.displayName}
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
    position: 'relative',
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
    fontSize: winWidth * 0.04,
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
