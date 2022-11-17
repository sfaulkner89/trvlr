import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../types/colors'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import { default as AnIcon } from 'react-native-vector-icons/AntDesign'
import { default as FaIcon } from 'react-native-vector-icons/FontAwesome5'
import { default as EnIcon } from 'react-native-vector-icons/Entypo'

type Props = {
  colors: Colors
  setMessages: (messageState: boolean) => void
}

const buttonSize = winWidth * 0.05

export default function ChatListHeader ({ colors, setMessages }: Props) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => setMessages(false)}>
        <AnIcon name='left' size={buttonSize} color={colors.lightColor} />
      </Pressable>

      <Text style={{ ...styles.handle, color: colors.lightColor }}>
        Messages
      </Text>
      <Pressable style={styles.button}>
        <EnIcon
          name='dots-three-horizontal'
          size={buttonSize}
          color={colors.lightColor}
        />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: winHeight * 0.09,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: winHeight * 0.02,
    flexDirection: 'row'
  },
  handle: {
    marginTop: winHeight * 0.01,
    fontSize: winWidth * 0.035,
    fontWeight: 'bold',
    width: winWidth * 0.76,
    textAlign: 'center'
  },
  button: {
    width: winWidth * 0.12,
    alignItems: 'center'
  }
})
