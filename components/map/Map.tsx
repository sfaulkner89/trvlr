import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import MapView, { LatLng, Marker } from 'react-native-maps'
import { Colors } from '../../types/colors'
import getMapAreaName from '../../handlers/googleServices/getMapAreaName'

import { winHeight, winWidth } from '../../assets/variables/height-width'
import MapPin from './MapPin'
import { Deltas } from '../../types/Deltas'
import initialPosition from '../../assets/config/initialPosition'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  changeMapLocation,
  clearMapBrowseArea,
  setMapBrowseArea,
  setNearbyPlace
} from '../../redux/slices/locationSlice'
import {
  clearSelectedPlace,
  setSelectedPlace
} from '../../redux/slices/resultsSlice'
import NewListPage from '../../components/newList/NewListPage'
import { Member } from '../../types/Member'
import { List } from '../../types/List'
import ListPage from '../../components/listPage/ListPage'
import HeaderBar from '../../components/headerBar/HeaderBar'
import { PlaceDetails } from 'types/PlaceDetails'
import ProfileListPage from '../../components/profilePage/profileList/ProfileListPage'
import getPlaceDetails from '../../handlers/googleServices/getPlaceDetails'
import nearbySearch from '../../handlers/googleServices/nearbySearch'
import { PlaceSearchResult } from '../../types/PlaceSearchResult'

type Props = {
  colors: Colors
  currentUser: Member
  isCurrentUser: boolean
  setMessages: (set: boolean) => void
  setPage: (set: number) => void
}

export default function Map ({
  colors,
  currentUser,
  isCurrentUser,
  setMessages,
  setPage
}: Props) {
  const [deltas, setDeltas] = useState<Deltas | undefined>({
    latitudeDelta: 180,
    longitudeDelta: 180
  })
  const [newList, setNewList] = useState(false)
  const [selectedList, setSelectedList] = useState<List | undefined>()
  const [position, setPosition] = useState<LatLng & Deltas>(initialPosition)
  const [addToList, setAddToList] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const mapPosition = useAppSelector(state => state.location.map)
  const areaNames = useAppSelector(state => state.location.browseArea)
  const checkInLocation = useAppSelector(
    state => state.location.checkInLocation
  )
  const selectedPlace: PlaceDetails = useAppSelector(
    state => state.results.selectedPlace
  )
  const member = useAppSelector(state => state.user)
  const moveHandler = async () => {
    // setDeltas({
    //   latitudeDelta: position.latitudeDelta,
    //   longitudeDelta: position.longitudeDelta
    // })
    dispatch(changeMapLocation(position))
    if (position.latitudeDelta + position.longitudeDelta >= 2) {
      const placeDetails = await getMapAreaName(position)
      dispatch(setMapBrowseArea(placeDetails))
    } else {
      const result: PlaceSearchResult | void = await nearbySearch(position)
      if (result) {
        dispatch(
          changeMapLocation({
            //changes location to the new place and keeps existing zoom level
            ...result.location
            // latitudeDelta: 0.004,
            // longitudeDelta: 0.004
          })
        )
        dispatch(setNearbyPlace(result))
        const details = await getPlaceDetails(result)
        console.log(details)
        dispatch(
          setSelectedPlace({ ...result, ...details, placeId: result.placeId })
        )
      }
    }
  }
  const touchHandler = () => {
    dispatch(clearMapBrowseArea())
    dispatch(clearSelectedPlace())
  }

  const pinAtCheckIn =
    mapPosition.longitude === checkInLocation.location.longitude &&
    mapPosition.latitude === checkInLocation.location.latitude

  const mapPositionCalibrated = {
    ...mapPosition,
    longitude: mapPosition.longitude - 0.00015,
    latitude: mapPosition.latitude + 0.00015
  }

  return (
    <View style={styles.container}>
      {newList ? (
        <NewListPage
          colors={colors}
          currentUser={currentUser}
          setNewList={setNewList}
          setSelectedList={setSelectedList}
        />
      ) : addToList ? (
        <ProfileListPage
          colors={colors}
          member={member}
          isCurrentUser={isCurrentUser}
          setSelectedList={setSelectedList}
          newListProvided={true}
          setNewList={setNewList}
          setAddToList={setAddToList}
          addToList={addToList}
          selectedList={selectedList}
        />
      ) : selectedList ? (
        <ListPage
          colors={colors}
          list={selectedList}
          setSelectedList={setSelectedList}
          isCurrentUser={isCurrentUser}
          setPage={setPage}
        />
      ) : (
        <React.Fragment>
          <HeaderBar colors={colors} setMessages={setMessages} />
          <MapPin
            colors={colors}
            areaNames={areaNames}
            deltas={deltas}
            selectedPlace={selectedPlace}
            setNewList={setNewList}
            setAddToList={setAddToList}
          />
          <MapView
            style={styles.map}
            region={mapPositionCalibrated}
            onRegionChange={e => setPosition(e)}
            onTouchEnd={() => moveHandler()}
            onTouchMove={() => touchHandler()}
          >
            {!pinAtCheckIn && <Marker coordinate={checkInLocation.location} />}
          </MapView>
        </React.Fragment>
      )}
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
