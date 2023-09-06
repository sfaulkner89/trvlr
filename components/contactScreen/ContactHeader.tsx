import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import { AntDesign } from '@expo/vector-icons'
import { Colors } from '../../types/colors'

type Props = {
  colors: Colors
  title: string
}

export default function ContactHeader ({ colors, title }: Props) {
  return (
    <View style={styles.container}>
      <Pressable style={{ ...styles.qrHolder }}>
        <AntDesign
          name='qrcode'
          size={winHeight * 0.04}
          color={colors.lightColor}
        />
      </Pressable>
      <Text style={{ ...styles.title, color: colors.lightColor }}>{title}</Text>
      <Pressable style={{ ...styles.qrHolder }}>
        <AntDesign
          name='adduser'
          size={winHeight * 0.04}
          color={colors.lightColor}
        />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: winHeight * 0.07,
    width: winWidth * 0.95,
    marginTop: winHeight * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: winWidth * 0.05,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  qrHolder: {}
})
