import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import { Colors } from '../../types/colors'
import groupData from '../../assets/groupdata'
import GroupList from './GroupList'

const winHeight = Dimensions.get('window').height
const winWidth = Dimensions.get('window').width

type Props = {
  colors: Colors
}

export default function ListScreen ({ colors }: Props) {
  return (
    <View style={{ ...styles.container, backgroundColor: colors.darkColor }}>
      <View style={styles.listHeader}></View>
      <ScrollView>
        {groupData.map((group, i) => {
          return <GroupList group={group} colors={colors} key={i} />
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listHeader: {
    height: winHeight * 0.05
  }
})
