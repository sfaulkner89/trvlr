import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../types/colors'
import { default as FeIcon } from 'react-native-vector-icons/Feather'
import { default as IoIcon } from 'react-native-vector-icons/Ionicons'
import MapSearch from '../map/MapSearch'

const winHeight = Dimensions.get('window').height
const winWidth = Dimensions.get('window').width
const size = winWidth * 0.06

type Props = {
  colors: Colors
  setProfile: (show: boolean) => void
}

export default function HeaderBar ({ colors, setProfile }: Props) {
  const [search, setSearch] = useState(false)

  return (
    <View style={{ ...styles.container, backgroundColor: 'transparent' }}>
      {search ? (
        <View />
      ) : (
        <React.Fragment>
          <Pressable
            style={{ ...styles.button, backgroundColor: colors.darkColor }}
          >
            <FeIcon
              name='message-circle'
              size={size}
              color={colors.lightColor}
            />
          </Pressable>
          <Pressable
            style={{ ...styles.button, backgroundColor: colors.darkColor }}
            onPress={() => setProfile(true)}
          >
            <IoIcon name='person' size={size} color={colors.lightColor} />
          </Pressable>
        </React.Fragment>
      )}
      <MapSearch colors={colors} search={search} setSearch={setSearch} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: winHeight * 0.11,
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: winWidth * 0.05,
    width: winWidth * 0.9,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  button: {
    opacity: 0.7,
    padding: winWidth * 0.02,
    borderRadius: size
  }
})
