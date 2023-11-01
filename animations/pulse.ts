import { Animated, Easing } from 'react-native'

export default (pulseAnimation: Animated.Value) => {
  return Animated.loop(
    Animated.sequence([
      Animated.timing(pulseAnimation, {
        toValue: 1.1, // Scale up to 1.1
        duration: 1500, // Duration of the pulse
        easing: Easing.inOut(Easing.ease), // Easing function
        useNativeDriver: true // Use native driver for performance
      }),
      Animated.timing(pulseAnimation, {
        toValue: 1, // Scale back to 1
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true
      })
    ])
  )
}
