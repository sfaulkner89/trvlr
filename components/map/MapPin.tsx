import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import { FontAwesome } from '@expo/vector-icons'
import { Colors } from '../../types/colors'
import { AreaNames } from '../../types/AreaNames'
import { Deltas } from '../../types/Deltas'
import { PlaceDetails } from 'types/PlaceDetails'
import localeSelector from '../../assets/tools/localeSelector'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setCheckInLocation } from '../../redux/slices/locationSlice'
import { useMutation } from '@apollo/client'
import { PUT_USER } from '../../handlers/gql/users/putUser'

type Props = {
  colors: Colors
  areaNames: AreaNames[]
  selectedPlace: PlaceDetails
  deltas: Deltas
  setNewList: (set: boolean) => void
  setAddToList: (set: boolean) => void
}

export default function MapPin ({
  colors,
  areaNames,
  selectedPlace,
  deltas,
  setNewList,
  setAddToList
}: Props) {
  const location = useAppSelector(state => state.location.nearbyPlace)
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const [checkIn] = useMutation(PUT_USER)

  const onCheckInPress = () => {
    console.log('LOCATION', location)
    dispatch(setCheckInLocation(location))
    checkIn({
      variables: {
        userId: user.id,
        checkInLocation: location
      }
    })
  }

  return (
    <React.Fragment>
      {areaNames && !selectedPlace && (
        <View style={{ ...styles.infoBox, backgroundColor: colors.midColor }}>
          <Text style={{ ...styles.placeName, color: colors.lightColor }}>
            {localeSelector(areaNames, deltas)}
          </Text>
          <View style={styles.buttonHolder}>
            <Pressable
              style={{
                ...styles.button,
                backgroundColor: colors.selectedColor
              }}
              onPress={onCheckInPress}
            >
              <Text style={{ ...styles.buttonText, color: colors.darkColor }}>
                Check In
              </Text>
            </Pressable>
            <Pressable
              style={{
                ...styles.button,
                backgroundColor: colors.selectedColor
              }}
              onPress={() => setNewList(true)}
            >
              <Text style={{ ...styles.buttonText, color: colors.darkColor }}>
                Create List
              </Text>
            </Pressable>
          </View>
        </View>
      )}
      {selectedPlace && (
        <View style={{ ...styles.infoBox, backgroundColor: colors.midColor }}>
          <Text style={{ ...styles.placeName, color: colors.lightColor }}>
            {selectedPlace.name}
          </Text>
          <View style={styles.buttonHolder}>
            <Pressable
              onPress={onCheckInPress}
              style={{
                ...styles.button,
                backgroundColor: colors.selectedColor
              }}
            >
              <Text style={{ ...styles.buttonText, color: colors.darkColor }}>
                Check In
              </Text>
            </Pressable>
            <Pressable
              style={{
                ...styles.button,
                backgroundColor: colors.selectedColor
              }}
              onPress={() => setAddToList(true)}
            >
              <Text style={{ ...styles.buttonText, color: colors.darkColor }}>
                Add To List
              </Text>
            </Pressable>
          </View>
        </View>
      )}
      <FontAwesome
        name='map-pin'
        style={styles.pin}
        color={colors.midColor}
        size={winWidth * 0.1}
      />
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  pin: {
    position: 'absolute',
    zIndex: 20,
    top: winHeight * 0.5,
    left: winWidth * 0.5
    // height: 40,
    // width: 40,
    // transform: [{ translateX: -20 }, { translateY: -20 }]
  },
  infoBox: {
    position: 'absolute',
    zIndex: 20,
    top: winHeight * 0.39,
    left: winWidth * 0.2,
    width: winWidth * 0.64,
    height: winHeight * 0.1,
    translateX: winWidth * 0.25,
    translateY: winHeight * 0.07,
    padding: 10,
    borderRadius: winWidth * 0.05,
    alignItems: 'center',
    justifyContent: 'center'
  },
  placeName: {},
  button: {
    flex: 1,
    margin: winWidth * 0.02,
    padding: winWidth * 0.01,
    borderRadius: winWidth * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
    height: winHeight * 0.04
  },
  buttonText: {
    fontSize: winWidth * 0.035,
    textAlign: 'center'
  },
  buttonHolder: {
    flexDirection: 'row'
  }
})
