import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../types/colors'
import MapSearch from '../map/MapSearch'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  changeMapLocation,
  setMapBrowseArea,
  setNearbyPlace
} from '../../redux/slices/locationSlice'
import getMapAreaName from '../../handlers/googleServices/getMapAreaName'
import nearbySearch from '../../handlers/googleServices/nearbySearch'
import { PlaceSearchResult } from '../../types/PlaceSearchResult'
import getPlaceDetails from '../../handlers/googleServices/getPlaceDetails'
import { setSelectedPlace } from '../../redux/slices/resultsSlice'

const size = winWidth * 0.06

type Props = {
  colors: Colors
  setMessages: (active: boolean) => void
}

export default function HeaderBar ({ colors, setMessages }: Props) {
  const [search, setSearch] = useState(false)
  const searchOpen = useAppSelector(state => state.search.searchOpen)

  const dispatch = useAppDispatch()
  const checkInLocation = useAppSelector(
    state => state.location.checkInLocation
  )

  const homeHandler = async () => {
    const position = {
      longitude: checkInLocation.location.longitude,
      latitude: checkInLocation.location.latitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005
    }
    dispatch(changeMapLocation(position))
    const placeDetails = await getMapAreaName(position)
    dispatch(setMapBrowseArea(placeDetails))
    const result: PlaceSearchResult | void = await nearbySearch(position)
    if (result) {
      dispatch(setNearbyPlace(result))
      const details = await getPlaceDetails(result)
      dispatch(
        setSelectedPlace({ ...result, ...details, placeId: result.placeId })
      )
    }
  }

  return (
    <View style={{ ...styles.container, backgroundColor: 'transparent' }}>
      <MapSearch colors={colors} />
      {!searchOpen && (
        <React.Fragment>
          <Pressable
            style={{ ...styles.button, backgroundColor: colors.darkColor }}
            onPress={() => setMessages(true)}
          >
            <AntDesign name='message1' size={size} color={colors.lightColor} />
          </Pressable>
          {checkInLocation && (
            <Pressable
              onPress={homeHandler}
              style={{ ...styles.button, backgroundColor: colors.darkColor }}
            >
              <Entypo name='home' size={24} color={colors.lightColor} />
            </Pressable>
          )}
        </React.Fragment>
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
