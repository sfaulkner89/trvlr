import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../types/colors'
import { FontAwesome } from '@expo/vector-icons'
import SearchSelector from './Selector'
import { searchCriteria } from '../../assets/variables/searchCriteria'

const winHeight = Dimensions.get('window').height
const winWidth = Dimensions.get('window').width

const size = winWidth * 0.06

type Props = {
  colors: Colors
}

export default function Search ({ colors }: Props) {
  const [searchType, setSearchType] = useState(0)
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ ...styles.container, backgroundColor: colors.darkColor }}>
        <View style={styles.inputContainer}>
          <View
            style={{ ...styles.inputBase, backgroundColor: colors.lightColor }}
          >
            <FontAwesome
              name='search'
              size={size}
              color={colors.darkColor}
              style={styles.searchIcon}
            />
            <TextInput
              style={{ ...styles.input }}
              selectionColor={colors.darkColor}
            />
          </View>
          <SearchSelector
            colors={colors}
            buttonList={searchCriteria}
            selection={searchType}
            setSelection={setSearchType}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: winWidth
  },
  input: {
    width: winWidth * 0.8,
    height: winHeight * 0.04,
    marginLeft: winWidth * 0.03,
    fontSize: winHeight * 0.02
  },
  inputContainer: {
    height: 0.17 * winHeight,
    paddingTop: winHeight * 0.06,
    width: winWidth,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputBase: {
    borderRadius: size,
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchIcon: {
    marginLeft: winWidth * 0.02
  }
})
