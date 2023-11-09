import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native'
import React, { useEffect, useState } from 'react'
import googleTypeFixer from '../../assets/tools/googleTypeFixer'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setListEdit, showAddToList } from '../../redux/slices/listSlice'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import { Entypo } from '@expo/vector-icons'
import { useMutation } from '@apollo/client'
import { PUT_USER } from '../../handlers/gql/users/putUser'
import { setCheckInLocation } from '../../redux/slices/locationSlice'

export default function PlaceInfoModal () {
  const dispatch = useAppDispatch()
  const colors = useAppSelector(state => state.colors)
  const selectedPlace = useAppSelector(state => state.results.selectedPlace)
  const nearbyPlace = useAppSelector(state => state.location.nearbyPlace)
  const user = useAppSelector(state => state.user)

  const [moreDetails, setMoreDetails] = useState(false)

  const [heightValue, setHeightValue] = useState(new Animated.Value(60))

  const [checkIn] = useMutation(PUT_USER)

  useEffect(() => {
    // Define the animation configuration
    const animation = Animated.timing(heightValue, {
      toValue: moreDetails ? 200 : 60, // Final height value based on shouldAnimate
      duration: 300, // Duration of the animation (2 seconds)
      easing: Easing.linear, // Easing function for smooth transition
      useNativeDriver: false // Set to false if you're using LayoutAnimation
    })

    animation.start(() => {})
  }, [moreDetails])

  const onCheckInPress = () => {
    console.log('LOCATION', nearbyPlace)

    checkIn({
      variables: {
        userId: user.id,
        checkInLocation: nearbyPlace
      }
    }).then(() => {
      dispatch(setCheckInLocation(nearbyPlace))
    })
  }

  return (
    <Pressable
      onPress={() => setMoreDetails(!moreDetails)}
      style={
        {
          // ...styles.nearbyHolder,
        }
      }
    >
      <Animated.View
        style={{
          ...(moreDetails ? styles.nearbyHolderExtended : styles.nearbyHolder),
          backgroundColor: colors.lightColor,
          height: heightValue,
          flexDirection: moreDetails ? 'column' : 'row',
          justifyContent: 'space-between'
        }}
      >
        <View style={styles.addressHolder}>
          <Text style={{ ...styles.nearbyTitle, color: colors.darkColor }}>
            {selectedPlace?.name}
          </Text>
          <Text>{selectedPlace?.address}</Text>
        </View>

        {moreDetails && (
          <View style={styles.additionalInfo}>
            <Text>{googleTypeFixer(selectedPlace?.establishment?.types)}</Text>
            <Text>{selectedPlace?.establishment?.rating}</Text>
            <Text>{selectedPlace?.establishment?.price}</Text>
          </View>
        )}
        <View style={{ ...styles.buttons }}>
          <View>
            <Pressable
              style={{
                ...styles.button,
                backgroundColor: colors.selectedColor
              }}
              onPress={() => dispatch(setListEdit(true))}
            >
              {moreDetails ? (
                <Text style={{ ...styles.buttonText, color: colors.darkColor }}>
                  Add To List
                </Text>
              ) : (
                <Entypo name='add-to-list' size={24} color='black' />
              )}
            </Pressable>
          </View>
          <View>
            <Pressable
              style={{
                ...styles.button,
                backgroundColor: colors.selectedColor
              }}
              onPress={onCheckInPress}
            >
              {moreDetails ? (
                <Text style={{ ...styles.buttonText, color: colors.darkColor }}>
                  Check In
                </Text>
              ) : (
                <Entypo name='location' size={24} color={colors.darkColor} />
              )}
            </Pressable>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '0 10 0 10'
  },
  button: {
    padding: winWidth * 0.01,
    borderRadius: winWidth * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
    height: winHeight * 0.04,
    margin: winWidth * 0.01
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row'
  },
  buttonText: {
    fontSize: winWidth * 0.035,
    textAlign: 'center'
  },
  addressHolder: {
    marginLeft: winWidth * 0.02,
    maxWidth: '70%'
  },
  nearbyHolder: {
    width: winWidth,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10
  },
  nearbyHolderExtended: {
    width: winWidth,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  additionalInfo: {},
  nearbyTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})
