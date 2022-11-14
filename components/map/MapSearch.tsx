import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  TextInput
} from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { default as EnIcon } from 'react-native-vector-icons/Entypo'
import { Colors } from '../../types/colors'

const winHeight: number = Dimensions.get('window').height
const winWidth: number = Dimensions.get('window').width

const size: number = winWidth * 0.06

type Props = {
  colors: Colors
  search: boolean
  setSearch: (active: boolean) => void
}

export default function MapSearch ({ colors, search, setSearch }: Props) {
  return (
    <Pressable
      onPress={() => setSearch(true)}
      style={
        search
          ? { ...styles.clickedContainer, backgroundColor: colors.darkColor }
          : { ...styles.container, backgroundColor: colors.darkColor }
      }
    >
      <Icon name='search' size={size} color={colors.lightColor} />
      {search ? (
        <React.Fragment>
          <TextInput
            style={styles.input}
            selectionColor={colors.selectedColor}
          />
          <Pressable onPress={() => setSearch(false)} style={styles.icon}>
            <EnIcon name='cross' size={size} color={colors.lightColor} />
          </Pressable>
        </React.Fragment>
      ) : (
        <View />
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 10,
    padding: winWidth * 0.02,
    borderRadius: size,
    opacity: 0.7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  clickedContainer: {
    position: 'relative',
    zIndex: 10,
    padding: winWidth * 0.02,
    borderRadius: size,
    opacity: 0.7,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  input: {
    width: winWidth * 0.7,
    fontSize: winHeight * 0.02
  },
  icon: {
    marginLeft: winWidth * 0.03
  }
})
