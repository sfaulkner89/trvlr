import { MutableRefObject } from 'react'
import { Animated, Easing } from 'react-native'

export default (shakeAnimation: Animated.Value) => {
  return Animated.sequence([
    Animated.timing(shakeAnimation, {
      toValue: 10,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true
    }),
    Animated.timing(shakeAnimation, {
      toValue: -10,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true
    }),
    Animated.timing(shakeAnimation, {
      toValue: 10,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true
    }),
    Animated.timing(shakeAnimation, {
      toValue: 0,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true
    })
  ])
}
