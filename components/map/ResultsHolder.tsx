import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PlaceSearchResult } from 'types/PlaceSearchResult'
import { Colors } from 'types/colors'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import hexToRgbA from '../../assets/tools/hexToRbga'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  clearPlaceResults,
  setSelectedPlace
} from '../../redux/slices/resultsSlice'
import getPlaceDetails from '../../handlers/googleServices/getPlaceDetails'
import {
  changeMapLocation,
  clearMapBrowseArea
} from '../../redux/slices/locationSlice'
import { closeSearch } from '../../redux/slices/searchSlice'

type Props = {
  results: PlaceSearchResult[]
  colors: Colors
}

export default function ResultsHolder ({ results, colors }: Props) {
  const dispatch = useAppDispatch()
  const location = useAppSelector(state => state.location.map)

  const selectionHandler = async (result: PlaceSearchResult) => {
    const details = await getPlaceDetails(result)
    dispatch(
      changeMapLocation({
        //changes location to the new place and keeps existing zoom level
        ...details.location,
        latitudeDelta: 0.004,
        longitudeDelta: 0.004
      })
    )
    const placeId = result.placeId
    dispatch(clearPlaceResults())
    dispatch(clearMapBrowseArea())
    dispatch(closeSearch())
    dispatch(setSelectedPlace({ ...details, placeId }))
  }

  return (
    <View
      style={{
        ...styles.resultsContainer,
        backgroundColor: hexToRgbA(colors.midColor, 0.9)
      }}
    >
      {results.map((result, i) => {
        return (
          <Pressable
            key={i}
            onPress={() => selectionHandler(result)}
            style={{
              ...styles.resultHolderButton
            }}
          >
            <View>
              <Text style={{ ...styles.placeName, color: colors.lightColor }}>
                {result.description}
              </Text>
              <Text style={{ ...styles.address, color: colors.lightColor }}>
                {result.names.secondary_text}
              </Text>
            </View>
          </Pressable>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  resultHolderButton: {
    padding: winWidth * 0.03
  },
  resultsContainer: {
    marginTop: winHeight * 0.005,
    borderRadius: winHeight * 0.01
  },
  placeName: {},
  address: {}
})
