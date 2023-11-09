import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  TextInput
} from 'react-native'
import React, { useState } from 'react'
import { Entypo } from '@expo/vector-icons'
import { Colors } from '../../types/colors'
import placeSearch from '../../handlers/googleServices/placeSearch'
import ResultsHolder from './ResultsHolder'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { AntDesign } from '@expo/vector-icons'
import {
  changePlaceResults,
  clearPlaceResults
} from '../../redux/slices/resultsSlice'
import { closeSearch, openSearch } from '../../redux/slices/searchSlice'

const winHeight: number = Dimensions.get('window').height
const winWidth: number = Dimensions.get('window').width

const size: number = winWidth * 0.06

type Props = {
  colors: Colors
}

export default function MapSearch ({ colors }: Props) {
  const mapLocation = useAppSelector(state => state.location.map)
  const placeResults = useAppSelector(state => state.results.mapSearch)
  const searchOpen = useAppSelector(state => state.search.searchOpen)
  const dispatch = useAppDispatch()

  const crossHandler = () => {
    dispatch(closeSearch())
    dispatch(clearPlaceResults())
  }

  const changeHandler = async (search: string) => {
    const results = await placeSearch(search, mapLocation)
    console.log('RESULTS', results)
    if (results) {
      dispatch(changePlaceResults(results))
    }
  }

  return (
    <View>
      <Pressable
        onPress={() => dispatch(openSearch())}
        style={
          searchOpen
            ? { ...styles.clickedContainer, backgroundColor: colors.darkColor }
            : { ...styles.container, backgroundColor: colors.darkColor }
        }
      >
        <AntDesign name='search1' size={size} color={colors.lightColor} />
        {searchOpen && (
          <React.Fragment>
            <TextInput
              style={{ ...styles.input, color: colors.lightColor }}
              selectionColor={colors.selectedColor}
              onChangeText={changeHandler}
            />
            <Pressable onPress={crossHandler} style={styles.icon}>
              <Entypo name='cross' size={size} color={colors.lightColor} />
            </Pressable>
          </React.Fragment>
        )}
      </Pressable>
      {placeResults && <ResultsHolder results={placeResults} colors={colors} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 10,
    padding: winWidth * 0.02,
    borderRadius: size,
    opacity: 0.7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  clickedContainer: {
    position: 'relative',
    zIndex: 10,
    padding: winWidth * 0.02,
    borderRadius: size,
    opacity: 0.7,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  input: {
    width: winWidth * 0.7,
    fontSize: winHeight * 0.02,
    paddingLeft: winWidth * 0.03
  },
  icon: {
    marginLeft: winWidth * 0.03
  }
})
