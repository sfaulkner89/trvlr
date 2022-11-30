import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../types/colors'
import { List } from '../../../types/List'
import MapView from 'react-native-maps'
import { winHeight, winWidth } from '../../../assets/variables/height-width'
import { default as FaIcon } from 'react-native-vector-icons/FontAwesome'
import { default as AnIcon } from 'react-native-vector-icons/AntDesign'

type Props = {
  colors: Colors
  list: List
  setSelectedList: (list: List) => void
}

const iconSize = winWidth * 0.04

export default function ListMini ({ colors, list, setSelectedList }: Props) {
  return (
    <Pressable
      style={{
        ...styles.container,
        backgroundColor: colors.darkColor,
        borderColor: colors.lightColor
      }}
      onPress={() => setSelectedList(list)}
    >
      {list.photo ? (
        <Image source={list.photo} style={styles.photo} />
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: list.location.latitude,
            longitude: list.location.longitude,
            latitudeDelta: 1,
            longitudeDelta: 1
          }}
          loadingEnabled={true}
        />
      )}
      <View style={styles.textHolder}>
        <Text style={{ ...styles.displayName, color: colors.lightColor }}>
          {list.displayName}
        </Text>
        <Text style={{ ...styles.geography, color: colors.lightColor }}>
          {list.city}, {list.country}
        </Text>
      </View>
      <View style={{ ...styles.iconHolder }}>
        <Text style={{ ...styles.places, color: colors.lightColor }}>
          {list.places.length}
        </Text>

        <FaIcon name='map-pin' size={iconSize} color={colors.lightColor} />
        <AnIcon
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
