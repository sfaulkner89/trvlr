import { Animated, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import { useAppSelector } from '../../redux/hooks'

export default function PlaceAddedModal ({
  modalMessage = 'Place Added'
}: {
  modalMessage: string
}) {
  const colors = useAppSelector(state => state.colors)

  const slideAnim = new Animated.Value(0)

  useEffect(() => {
    if (modalMessage)
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false // Set to true if you want to use the native driver (requires additional setup)
        }),
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false // Set to true if you want to use the native driver (requires additional setup)
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false // Set to true if you want to use the native driver (requires additional setup)
        })
      ]).start()
  }, [modalMessage])

  const slideInStyles = {
    opacity: slideAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    }),
    transform: [
      {
        translateX: slideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [
            modalMessage ? winWidth * 1.5 : 0,
            modalMessage ? 0 : winWidth * 1.5
          ] // Slide in from the right (adjust the value as needed)
        })
      }
    ]
  }

  return (
    <Animated.View
      style={{
        ...container,
        backgroundColor: colors.darkColor,
        ...slideInStyles
      }}
    >
      <Text style={{ ...modalText, color: colors.lightColor }}>
        {modalMessage}
      </Text>
    </Animated.View>
  )
}

const { container, modalText } = StyleSheet.create({
  container: {
    marginBottom: winHeight * 0.01,
    width: winWidth * 0.95,
    height: winHeight * 0.05,
    borderRadius: winWidth * 0.02,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalText: {
    fontSize: winWidth * 0.04,
    textAlign: 'center'
  }
})
