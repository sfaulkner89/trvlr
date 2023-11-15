import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { winWidth } from '../../assets/variables/height-width'
import { Entypo } from '@expo/vector-icons'
import { useAppDispatch } from '../../redux/hooks'
import { setNotificationScreen } from '../../redux/slices/notificationSlice'

export default function NotificationScreen () {
  const dispatch = useAppDispatch()

  return (
    <View style={container}>
      <Pressable
        onPress={() => dispatch(setNotificationScreen(false))}
        style={exitButton}
      >
        <Entypo name='cross' size={winWidth * 0.2} color='black' />
      </Pressable>
    </View>
  )
}

const { container, exitButton } = StyleSheet.create({
  container: {
    flex: 1,
    width: winWidth,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  exitButton: {
    position: 'absolute',
    top: winWidth * 0.05,
    right: winWidth * 0.05
  }
})
