import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../types/colors'
import MapSearch from '../map/MapSearch'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import { AntDesign } from '@expo/vector-icons'

const size = winWidth * 0.06

type Props = {
  colors: Colors
  setMessages: (active: boolean) => void
}

export default function HeaderBar ({ colors, setMessages }: Props) {
  const [search, setSearch] = useState(false)

  return (
    <View style={{ ...styles.container, backgroundColor: 'transparent' }}>
      <MapSearch colors={colors} search={search} setSearch={setSearch} />
      {!search && (
        <Pressable
          style={{ ...styles.button, backgroundColor: colors.darkColor }}
          onPress={() => setMessages(true)}
        >
          <AntDesign name='message1' size={size} color={colors.lightColor} />
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    position: 'absolute',
    top: winHeight * 0.05,
    left: winWidth * 0.05,
    width: winWidth * 0.9,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  button: {
    opacity: 0.7,
    padding: winWidth * 0.02,
    borderRadius: size
  }
})
