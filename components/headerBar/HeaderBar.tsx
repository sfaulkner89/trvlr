import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../types/colors'
import MapSearch from '../map/MapSearch'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { showChatPage } from '../../redux/slices/messageSlice'
import { setNotificationScreen } from '../../redux/slices/notificationSlice'

const size = winWidth * 0.06

type Props = {
  colors: Colors
}

export default function HeaderBar ({ colors }: Props) {
  const searchOpen = useAppSelector(state => state.search.searchOpen)

  const dispatch = useAppDispatch()

  return (
    <View style={{ ...styles.container, backgroundColor: 'transparent' }}>
      <MapSearch colors={colors} />
      {!searchOpen && (
        <React.Fragment>
          <Pressable
            style={{ ...styles.button, backgroundColor: colors.darkColor }}
            onPress={() => dispatch(showChatPage())}
          >
            <AntDesign name='message1' size={size} color={colors.lightColor} />
          </Pressable>
        </React.Fragment>
      )}
      <Pressable
        style={{ ...styles.button, backgroundColor: colors.darkColor }}
        onPress={() => {
          console.log('notif')
          dispatch(setNotificationScreen(true))
        }}
      >
        <Ionicons
          name='notifications-outline'
          size={size}
          color={colors.lightColor}
        />
        <View style={styles.notificationDot}></View>
      </Pressable>
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
    opacity: 0.8,
    padding: winWidth * 0.02,
    borderRadius: size
  },
  notificationDot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: 'red',
    position: 'absolute',
    top: -2,
    right: -2,
    opacity: 1
  }
})
