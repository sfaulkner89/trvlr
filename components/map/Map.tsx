import { StyleSheet, View, Image, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
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
import { setNearbyPlace } from '../../redux/slices/locationSlice'
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

type Props = {
  colors: Colors
  currentUser: Member
  isCurrentUser: boolean
  setMessages: (set: boolean) => void
  setPage: (set: number) => void
}

export default function Map ({ colors, currentUser }: Props) {
  const [moreDetails, setMoreDetails] = useState(false)
  const dispatch = useAppDispatch()
  const mapPosition = useAppSelector(state => state.location.map)
  const areaNames = useAppSelector(state => state.location.browseArea)
  const checkInLocation = useAppSelector(
    state => state.location.checkInLocation
  )
  const nearbyPlace: PlaceSearchResult = useAppSelector(
    state => state.location.nearbyPlace
  )
  const selectedPlace: PlaceDetails = useAppSelector(
    state => state.results.selectedPlace
  )
  const { data: contactLocations } = useQuery<{ getUsers: Member[] }>(
    GETUSERS,
    {
      variables: { ids: currentUser.following }
    }
  )

  const shortPressHandler = async (position: LatLng) => {
    console.log(position)
    const nearby = await nearbySearch(position)
    dispatch(setNearbyPlace(nearby))
    const placeDetails = await getPlaceDetails(nearby)
    dispatch(
      setSelectedPlace({
        ...placeDetails,
        placeId: nearby.placeId
      })
    )
  }

  const pinAtCheckIn =
    mapPosition?.longitude === checkInLocation?.location.longitude &&
    mapPosition?.latitude === checkInLocation?.location.latitude

  const mapPositionCalibrated = {
    ...mapPosition,
    longitude: mapPosition.longitude - 0.00015,
    latitude: mapPosition.latitude + 0.00015
  }

  return (
    <View style={styles.container}>
      <React.Fragment>
        <HeaderBar colors={colors} />
        <MapView
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
        >
          {checkInLocation && !pinAtCheckIn && (
            <ContactMarker contact={{ ...currentUser, checkInLocation }} />
          )}
          {(contactLocations?.getUsers || []).map((contact, i) => {
            return <ContactMarker key={i} contact={contact} />
          })}
          {nearbyPlace && (
            <Marker
              coordinate={{
                longitude: nearbyPlace?.location.longitude,
                latitude: nearbyPlace?.location.latitude
              }}
              pinColor={colors.darkColor}
            />
          )}
        </MapView>
        {nearbyPlace && selectedPlace && <PlaceInfoModal />}
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
