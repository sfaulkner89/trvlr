import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../../types/colors'
import { List } from '../../../types/List'
import MapView from 'react-native-maps'
import { winHeight, winWidth } from '../../../assets/variables/height-width'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import placeShim from '../../../assets/tools/placeShim'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { selectList } from '../../../redux/slices/listSlice'

import { setNoteScreen } from '../../../redux/slices/listEditorSlice'
import { PlaceDetails } from '../../../types/PlaceDetails'
import OptionHolder from '../../listPage/OptionHolder'
import { DELETELIST } from '../../../handlers/gql/lists/deleteList'
import { setUser } from '../../../redux/slices/userSlice'

type Props = {
  list: List
  submitHandler: (list: List) => void
  refetch: () => void
}

const iconSize = winWidth * 0.04

export default function ListMini ({ list, submitHandler, refetch }: Props) {
  const dispatch = useAppDispatch()
  const selectedPlace = useAppSelector<PlaceDetails>(
    state => state.results.selectedPlace
  )

  const noteRequested = useAppSelector(state => state.listEditor.noteRequested)
  const colors = useAppSelector(state => state.colors)
  const listEdit = useAppSelector(state => state.list.listEdit)
  const user = useAppSelector(state => state.user)
  const contact = useAppSelector(state => state.contact.selectedContact)

  const [deleteList] = useMutation(DELETELIST)

  const placeAlreadyOnList =
    listEdit &&
    !!list.places.find(place => place.googlePlaceId === selectedPlace.placeId)

  const [disabled, setDisabled] = useState(placeAlreadyOnList)
  const [options, setOptions] = useState(false)

  const pressHandler = async () => {
    dispatch(selectList({ ...list, places: placeShim(list.places) }))
    if (noteRequested) {
      dispatch(setNoteScreen(true))
    } else if (listEdit) {
      submitHandler({ ...list, places: placeShim(list.places) })
    }
  }

  const deleteHandler = async () => {
    await deleteList({
      variables: {
        userId: user.id,
        listId: list.id
      }
    }).then(data => {
      refetch()
    })
    setOptions(false)
  }

  if (options) {
    return (
      <OptionHolder
        colors={colors}
        type='list'
        option={{
          title: 'Delete List',
          icon: <AntDesign name='delete' size={iconSize} color='white' />,
          onPress: deleteHandler
        }}
      />
    )
  }

  return (
    <Pressable
      disabled={disabled}
      style={{
        ...styles.container,
        backgroundColor: disabled ? colors.midColor : colors.darkColor,
        borderColor: disabled ? colors.darkColor : colors.lightColor,
        borderTopColor: disabled ? colors.darkcolor : 'none',
        borderTopWidth: disabled ? 1 : 0
      }}
      onPress={pressHandler}
      onLongPress={!contact ? () => setOptions(true) : null}
    >
      {list.photo ? (
        <Image source={list.photo} style={styles.photo} />
      ) : (
        <MapView
          style={styles.map}
          region={{
            latitude: list.location?.latitude ?? 0,
            longitude: list.location?.longitude ?? 0,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }}
          loadingEnabled={true}
        />
      )}
      <View style={styles.textHolder}>
        <Text
          style={{
            ...styles.displayName,
            color: disabled ? colors.darkColor : colors.lightColor
          }}
        >
          {list.displayName}
        </Text>
        {list.country && list.city && (
          <Text style={{ ...styles.geography, color: colors.lightColor }}>
            {list.city}, {list.country}
          </Text>
        )}
      </View>

      <View style={{ ...styles.iconHolder }}>
        {disabled && (
          <View style={styles.disabledCheck}>
            <AntDesign
              name='checkcircle'
              size={iconSize * 1.5}
              color={colors.lightColor}
              style={styles.arrow}
            />
          </View>
        )}
        <Text style={{ ...styles.places, color: colors.lightColor }}>
          {list.places.length}
        </Text>
        <FontAwesome name='map-pin' size={iconSize} color={colors.lightColor} />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    height: winHeight * 0.1,
    width: winWidth,
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: winHeight * 0.0015
  },
  disabledCheck: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: winWidth * 0.05,
    borderRadius: winWidth * 0.03,
    padding: winWidth * 0.01
  },
  photo: {},
  map: {
    height: winHeight * 0.08,
    width: winWidth * 0.2,
    margin: winHeight * 0.01,
    borderRadius: winWidth * 0.03
  },
  textHolder: {},
  displayName: {
    fontWeight: 'bold'
  },
  iconHolder: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
    marginRight: winWidth * 0.02
  },
  places: {
    fontSize: iconSize,
    marginRight: winWidth * 0.01
  },
  arrow: {
    marginLeft: winWidth * 0.02
  },
  geography: {}
})
