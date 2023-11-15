import { StyleSheet, View, Image, Text, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import MapView, {
  LatLng,
  LongPressEvent,
  MapPressEvent,
  Marker,
  PoiClickEvent,
  PROVIDER_GOOGLE
} from 'react-native-maps'
import { Colors } from '../../types/colors'
import getMapAreaName from '../../handlers/googleServices/getMapAreaName'

import { winHeight, winWidth } from '../../assets/variables/height-width'
import { Deltas } from '../../types/Deltas'
import initialPosition from '../../assets/config/initialPosition'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  changeMapLocation,
  setMapBrowseArea,
  setNearbyPlace,
  setZoom
} from '../../redux/slices/locationSlice'
import { setSelectedPlace } from '../../redux/slices/resultsSlice'
import { Member } from '../../types/Member'
import HeaderBar from '../../components/headerBar/HeaderBar'
import { PlaceDetails } from 'types/PlaceDetails'
import getPlaceDetails from '../../handlers/googleServices/getPlaceDetails'
import nearbySearch from '../../handlers/googleServices/nearbySearch'
import { PlaceSearchResult } from '../../types/PlaceSearchResult'
import { useQuery } from '@apollo/client'
import { GETUSERS } from '../../handlers/gql/users/getUsers'
import ContactMarker from './ContactMarker'
import PlaceInfoModal from './PlaceInfoModal'
import PlaceAddedModal from './PlaceAddedModal'
import { GETCONTACTS } from '../../handlers/gql/users/getContacts'
import { setMapToast } from '../../redux/slices/modalSlice'
import { mapToast } from '../../assets/tools/toast'
import { Entypo } from '@expo/vector-icons'
import MapFooter from './MapFooter'

type Props = {
  colors: Colors
  currentUser: Member
  isCurrentUser: boolean
  setMessages: (set: boolean) => void
  setPage: (set: number) => void
}

export default function Map ({ colors, currentUser }: Props) {
  const mapRef = React.useRef<MapView>(null)

  const dispatch = useAppDispatch()

  const mapPosition = useAppSelector(state => state.location.map)
  const checkInLocation = useAppSelector(
    state => state.location.checkInLocation
  )
  const selectedPlace: PlaceDetails = useAppSelector(
    state => state.results.selectedPlace
  )

  const zoom = useAppSelector(state => state.location.zoom)
  const { data } = useQuery<{
    getContacts: { contacts: Member[] }
  }>(GETCONTACTS, {
    variables: { userId: currentUser.id }
  })
  const shortPressHandler = async (position: LatLng) => {
    if (position) {
      const nearby = await nearbySearch(position)
      if (nearby) {
        dispatch(setNearbyPlace(nearby))
        const placeDetails = await getPlaceDetails(nearby)
        dispatch(
          setSelectedPlace({
            ...placeDetails,
            placeId: nearby.placeId,
            address: nearby.names.secondary_text
          })
        )
      } else {
        dispatch(setSelectedPlace(null))
        mapToast(dispatch, 'No nearby places found', 3000)
      }
    }
  }

  const getZoom = async () => {
    const bounds = await mapRef.current.getMapBoundaries()
    dispatch(
      setZoom(
        Math.min(
          bounds.northEast.latitude - bounds.southWest.latitude,
          bounds.northEast.longitude - bounds.southWest.longitude
        )
      )
    )
  }

  const contactLocations = data?.getContacts?.contacts

  const mapPositionCalibrated = {
    ...mapPosition,
    longitude: mapPosition.longitude,
    latitude: mapPosition.latitude
  }

  return (
    <View style={styles.container}>
      <React.Fragment>
        <HeaderBar colors={colors} />
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={mapPositionCalibrated}
          onPress={(e: MapPressEvent) =>
            shortPressHandler(e.nativeEvent.coordinate)
          }
          onPoiClick={(e: PoiClickEvent) =>
            shortPressHandler(e.nativeEvent.coordinate)
          }
          onLongPress={(e: LongPressEvent) => console.log(e)}
          //onTouchEnd={getZoom}
          //onRegionChangeComplete={getZoom}
        >
          {checkInLocation && (
            <ContactMarker
              contact={{ ...currentUser, checkInLocation }}
              isCurrentUser={true}
              zoom={zoom}
            />
          )}
          {(contactLocations || []).map((contact, i) => {
            return (
              <ContactMarker
                key={i}
                contact={contact}
                isCurrentUser={false}
                zoom={zoom}
              />
            )
          })}
          {selectedPlace && (
            <Marker
              coordinate={{
                longitude: selectedPlace?.location.longitude,
                latitude: selectedPlace?.location.latitude
              }}
              pinColor={colors.darkColor}
            />
          )}
        </MapView>
        <MapFooter />
      </React.Fragment>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width: winWidth,
    height: winHeight
  }
})
