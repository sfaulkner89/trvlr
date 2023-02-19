import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from '../../../types/colors'
import { List } from '../../../types/List'
import MapView from 'react-native-maps'
import { winHeight, winWidth } from '../../../assets/variables/height-width'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import placeShim from '../../../assets/tools/placeShim'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { ADDPLACETOLIST } from '../../../handlers/gql/lists/addPlaceToList'
import { addToListHandler } from '../../../handlers/api/addToListHandler'
import { CHECKDUPLICATEPLACE } from '../../../handlers/api/checkDuplicatePlace'
import placeUnshim from '../../../assets/tools/placeUnshim'

type Props = {
  colors: Colors
  list: List
  setSelectedList: (list: List) => void
  selectedList: List
  addToList: boolean
  setAddToList: (set: boolean) => void
}

const iconSize = winWidth * 0.04

export default function ListMini ({
  colors,
  list,
  setSelectedList,
  addToList,
  setAddToList
}: Props) {
  const selectedPlace = useAppSelector(state => state.results.selectedPlace)
  const [placeAdder] = useMutation(ADDPLACETOLIST)

  const { data: duplicate, refetch } = useQuery(CHECKDUPLICATEPLACE, {
    variables: {
      listId: list.id,
      place: selectedPlace ? placeUnshim([selectedPlace])[0] : null
    }
  })

  useEffect(() => {
    refetch()
  }, [addToList])

  return (
    <Pressable
      disabled={addToList && duplicate ? duplicate?.checkDuplicatePlace : false}
      style={{
        ...styles.container,
        backgroundColor:
          addToList && duplicate?.checkDuplicatePlace
            ? colors.midColor
            : colors.darkColor,
        borderColor: colors.lightColor
      }}
      onPress={
        addToList
          ? async () =>
              await addToListHandler(
                placeAdder,
                selectedPlace,
                list,
                setAddToList
              )
          : () => setSelectedList({ ...list, places: placeShim(list.places) })
      }
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

        <FontAwesome name='map-pin' size={iconSize} color={colors.lightColor} />
        <AntDesign
          name='right'
          size={iconSize}
          color={colors.lightColor}
          style={styles.arrow}
        />
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
