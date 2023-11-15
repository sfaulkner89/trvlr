import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Marker } from 'react-native-maps'
import { Member } from '../../types/Member'
import { contactMarkerVisible } from '../../redux/slices/contactSlice'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../redux/hooks'
import ToolTip from './ToolTip'

type Props = {
  contact: Member
  isCurrentUser: boolean
  zoom: number
}

const ContactMarker = ({ contact, isCurrentUser, zoom }: Props) => {
  const dispatch = useDispatch()

  const dimensions = 30

  const selectedMarker = useAppSelector(state => state.contact.contactMarker)

  const pressHandler = () => {
    if (isCurrentUser) {
    } else {
      dispatch(contactMarkerVisible(contact))
    }
  }

  const isSelected = selectedMarker?.id === contact.id

  return (
    <>
      <Marker
        style={{ zIndex: 100 }}
        coordinate={{
          latitude: contact?.checkInLocation?.location.latitude,
          longitude: contact?.checkInLocation?.location.longitude
        }}
      >
        <Pressable onPress={pressHandler}>
          <Image
            source={{ uri: contact.profileLocation }}
            style={{
              ...styles.image,
              width: dimensions,
              height: dimensions,
              borderRadius: dimensions / 2,
              borderColor: isSelected ? 'red' : 'white',
              borderWidth: isSelected ? 2 : 0
            }}
          />
        </Pressable>
      </Marker>
    </>
  )
}

export default ContactMarker

const styles = StyleSheet.create({
  image: { width: 50, height: 50, borderRadius: 25, zIndex: 100 }
})
