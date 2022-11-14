import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../types/colors'
import { winWidth } from '../../assets/height-width'
import ProfileHeader from '../profilePage/ProfileHeader'
import { List } from '../../types/List'
import PlaceComponent from './PlaceComponent'

type Props = {
  colors: Colors
  list: List
  setSelectedList: (noList: undefined) => void
}

export default function ListPage ({ colors, list, setSelectedList }: Props) {
  return (
    <View style={{ ...styles.container, backgroundColor: colors.darkColor }}>
      <ProfileHeader
        colors={colors}
        profile={list}
        setProfilePage={setSelectedList}
        icon='edit'
      />
      <ScrollView
        style={{ ...styles.container, backgroundColor: colors.midColor }}
      >
        {list.places.map((place, i) => {
          return <PlaceComponent colors={colors} place={place} key={i} />
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: winWidth
  }
})
