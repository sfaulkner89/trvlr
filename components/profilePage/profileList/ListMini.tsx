import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../../types/colors'
import { List } from '../../../types/List'
import MapView from 'react-native-maps'
import { winHeight, winWidth } from '../../../assets/variables/height-width'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import placeShim from '../../../assets/tools/placeShim'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { useMutation, useQuery } from '@apollo/client'
import { ADDPLACETOLIST } from '../../../handlers/gql/lists/addPlaceToList'
import { addToListHandler } from '../../../handlers/api/addToListHandler'
import { CHECKDUPLICATEPLACE } from '../../../handlers/api/checkDuplicatePlace'
import placeUnshim from '../../../assets/tools/placeUnshim'
import { selectList } from '../../../redux/slices/listSlice'
import {
  Gesture,
  GestureDetector,
  Swipeable,
  TapGestureHandler,
  GestureHandlerRootView
} from 'react-native-gesture-handler'

type Props = {
  colors: Colors
  list: List
  addToList: boolean
  setAddToList: (set: boolean) => void
  noteRequested: boolean
  setNoteScreen: (set: boolean) => void
}

const iconSize = winWidth * 0.04

export default function ListMini ({
  colors,
  list,
  addToList,
  setAddToList,
  noteRequested,
  setNoteScreen
}: Props) {
  const [disabled, setDisabled] = useState(false)
  const dispatch = useAppDispatch()
  const selectedPlace = useAppSelector(state => state.results.selectedPlace)

  const [placeAdder] = useMutation(ADDPLACETOLIST)

  const { data: duplicate, refetch } = useQuery(CHECKDUPLICATEPLACE, {
    variables: {
      listId: list.id,
      place: selectedPlace ? placeUnshim([selectedPlace])[0] : null
    }
  })

  const [noteAdded, setNoteAdded] = useState(false)

  useEffect(() => {
    refetch()
  }, [addToList])

  const pressHandler = async () => {
    if (noteRequested) {
      dispatch(selectList({ ...list, places: placeShim(list.places) }))
      setNoteScreen(true)
      setNoteAdded(true)
    } else if (addToList || noteAdded) {
      await addToListHandler(placeAdder, selectedPlace, list, setAddToList)
    } else dispatch(selectList({ ...list, places: placeShim(list.places) }))
  }

  const renderRightActions = (progress, dragX) => {
    return (
      <View
        style={{
          ...styles.container,
          backgroundColor: colors.errorColor
        }}
      >
        <Text>Delete List</Text>
      </View>
    )
  }

  const onSwipeLeft = direction => {
    setDisabled(true)
    if (direction === 'right') {
      console.log('I was swiped right')
    }
  }

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={renderRightActions}
        onSwipeableWillOpen={onSwipeLeft}
        onSwipeableWillClose={() => setDisabled(false)}
      >
        <Pressable
          disabled={
            disabled ||
            (addToList && duplicate ? duplicate?.checkDuplicatePlace : false)
          }
          style={{
            ...styles.container,
            backgroundColor:
              addToList && duplicate?.checkDuplicatePlace
                ? colors.midColor
                : colors.darkColor,
            borderColor: colors.lightColor
          }}
          onPress={pressHandler}
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
                color:
                  addToList && duplicate?.checkDuplicatePlace
                    ? colors.darkColor
                    : colors.lightColor
              }}
            >
              {list.displayName}
            </Text>
            {list.country && list.city && (
              <Text style={{ ...styles.geography, color: colors.lightColor }}>
                {list.city}, {list.country}
              </Text>
            )}
            {addToList && duplicate && duplicate.checkDuplicatePlace && (
              <Text
                style={{
                  color: colors.errorColor
                }}
              >
                Place already on list.
              </Text>
            )}
          </View>
          <View style={{ ...styles.iconHolder }}>
            <Text style={{ ...styles.places, color: colors.lightColor }}>
              {list.places.length}
            </Text>
            <FontAwesome
              name='map-pin'
              size={iconSize}
              color={colors.lightColor}
            />
            <AntDesign
              name='right'
              size={iconSize}
              color={colors.lightColor}
              style={styles.arrow}
            />
          </View>
        </Pressable>
      </Swipeable>
    </GestureHandlerRootView>
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
    flex: 1
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
