import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native'
import React from 'react'
import { default as EnIcon } from 'react-native-vector-icons/Entypo'
import { default as FaIcon } from 'react-native-vector-icons/FontAwesome'
import { Colors } from '../../types/colors'

const winHeight = Dimensions.get('window').height
const winWidth = Dimensions.get('window').width
const iconSize = winWidth * 0.1

type Props = {
  colors: Colors
  page: number
  setPage: (page: number) => void
}

export default function Toolbar ({ colors, page, setPage }: Props) {
  const buttonProps = {}
  return (
    <View style={{ ...styles.container, backgroundColor: colors.darkColor }}>
      <Pressable style={styles.button} onPress={() => setPage(0)}>
        <EnIcon
          name='map'
          size={iconSize * 1.1}
          color={page === 0 ? colors.selectedColor : colors.lightColor}
        />
      </Pressable>
      <Pressable style={styles.button} onPress={() => setPage(1)}>
        <FaIcon
          name='search'
          size={iconSize}
          color={page === 1 ? colors.selectedColor : colors.lightColor}
        />
      </Pressable>
      <Pressable style={styles.button} onPress={() => setPage(2)}>
        <FaIcon
          name='list'
          size={iconSize}
          color={page === 2 ? colors.selectedColor : colors.lightColor}
        />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: winHeight * 0.1,
    width: winWidth,
    flexDirection: 'row',
    opacity: 0.7
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
