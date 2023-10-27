import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../types/colors'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import { List } from '../../types/List'
import PlaceComponent from './PlaceComponent'
import placeOptions from '../../assets/variables/placeOptions'
import MapView, { Marker } from 'react-native-maps'
import calculateBound from '../../handlers/calculateBound'
import calculateCenter from '../../handlers/calculateCenter'
import Options from './Options'
import ListHeader from './ListHeader'
import listOptions from '../../assets/variables/listOptions'
import { MaterialIcons } from '@expo/vector-icons'
import { PlaceDetails } from 'types/PlaceDetails'
import { useAppDispatch } from '../../redux/hooks'
import { deselectList } from '../../redux/slices/listSlice'

type Props = {
  colors: Colors
  list: List
}

const size = winWidth * 0.06

export default function ListPage ({ colors, list }: Props) {
  const placesListHolder = React.useRef<View>(null)
  const [listSelection, setListSelection] = useState<List | undefined>()
  const [placeSelection, setPlaceSelection] = useState<
    PlaceDetails | undefined
  >()
  const [highlightedPlace, setHighlightedPlace] = useState<number | undefined>()

  const dispatch = useAppDispatch()

  const bounds = calculateBound(list.places)
  const center = calculateCenter(list.places)

  return (
    <React.Fragment>
      {listSelection || placeSelection ? (
        <Options
          colors={colors}
          options={placeSelection ? placeOptions(colors) : listOptions(colors)}
        />
      ) : (
        <View />
      )}
      <View style={{ ...styles.container, backgroundColor: colors.darkColor }}>
        <ListHeader colors={colors} profile={list} />
        <View style={{ ...styles.mapHolder, backgroundColor: colors.midColor }}>
          {list.places.length > 0 && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: center.latitude,
                longitude: center.longitude,
                latitudeDelta: bounds.latitude * 1.5,
                longitudeDelta: bounds.longitude * 1.5
              }}
            >
              {list.places.map((place, i) => {
                const highlightStyle = highlightedPlace === i
                return (
                  <Marker coordinate={place.location} key={i}>
                    <View
                      style={
                        highlightStyle
                          ? { ...styles.highlightedMarker }
                          : { ...styles.marker }
                      }
                    >
                      <Text style={styles.markerText}>{i + 1}</Text>
                    </View>
                  </Marker>
                )
              })}
            </MapView>
          )}
        </View>

        <ScrollView>
          <View
            style={{
              ...styles.container,
              backgroundColor: colors.midColor
            }}
            ref={placesListHolder}
          >
            {list.places.map((place, i) => {
              return (
                <PlaceComponent
                  colors={colors}
                  place={place}
                  key={i}
                  setPlaceSelection={setPlaceSelection}
                  setHighlightedPlace={() => setHighlightedPlace(i)}
                  isHighlighted={highlightedPlace === i}
                />
              )
            })}
          </View>
        </ScrollView>

        <Pressable
          style={{
            ...styles.addPlaceButton,
            backgroundColor: colors.lightColor
          }}
          onPress={() => {
            dispatch(deselectList())
          }}
        >
          <MaterialIcons name='place' size={size} color={colors.midColor} />
          <Text style={{ ...styles.tinyPlus, color: colors.midColor }}>+</Text>
        </Pressable>
      </View>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: winWidth,
    alignItems: 'center'
  },
  map: {
    width: winWidth * 0.96,
    height: winHeight * 0.3,
    borderRadius: winWidth * 0.02,
    margin: winWidth * 0.02
  },
  mapHolder: {},
  addPlaceButton: {
    position: 'absolute',
    bottom: winHeight * 0.02,
    right: winWidth * 0.04,
    padding: winWidth * 0.025,
    borderRadius: size,
    opacity: 0.8,
    shadowOpacity: 0.6,
    shadowOffset: { width: winWidth * 0.01, height: winWidth * 0.01 }
  },
  marker: {
    width: winWidth * 0.05,
    height: winWidth * 0.05,
    borderRadius: winWidth * 0.025,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  markerText: {
    color: 'white'
  },
  highlightedMarker: {
    backgroundColor: 'darkred',
    width: winWidth * 0.1,
    height: winWidth * 0.1,
    borderRadius: winWidth * 0.05,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tinyPlus: {
    position: 'absolute',
    fontSize: winWidth * 0.04,
    bottom: winHeight * 0.006,
    right: winWidth * 0.021
  }
})
