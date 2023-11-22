import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../types/colors'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { List } from '../../types/List'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { deselectList, hideNewList } from '../../redux/slices/listSlice'
import {
  setOptionsTarget,
  setOptionsType,
  showOptions
} from '../../redux/slices/optionsSlice'

type Props = {
  colors: Colors
  profile: List
}

const buttonSize = winWidth * 0.05

export default function ListHeader ({ colors, profile }: Props) {
  const dispatch = useAppDispatch()
  const [liked, setLiked] = useState(false)
  const list = useAppSelector(state => state.list.selectedList)

  const likeHandler = () => {
    setLiked(!liked)
  }

  const backHandler = () => {
    dispatch(deselectList())
    dispatch(hideNewList())
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonsHolder}>
        <Pressable style={styles.button} onPress={backHandler}>
          <AntDesign name='left' size={buttonSize} color={colors.lightColor} />
        </Pressable>
      </View>
      <Text style={{ ...styles.displayName, color: colors.lightColor }}>
        {profile.displayName}
      </Text>
      <View style={styles.buttonsHolder}>
        <Pressable style={styles.button}>
          <AntDesign
            name={liked ? 'heart' : 'hearto'}
            size={buttonSize}
            color={colors.lightColor}
            onPress={likeHandler}
          />
        </Pressable>
        <Pressable style={styles.button}>
          <AntDesign name='save' size={buttonSize} color={colors.lightColor} />
        </Pressable>
        <Pressable style={styles.button}>
          <Entypo
            name='dots-three-horizontal'
            size={buttonSize}
            color={colors.lightColor}
            onPress={() => {
              dispatch(setOptionsType('list'))
              dispatch(setOptionsTarget(list))
            }}
          />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: winHeight * 0.09,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: winHeight * 0.02,
    flexDirection: 'row',
    width: winWidth
  },
  displayName: {
    marginTop: winHeight * 0.01,
    fontSize: winWidth * 0.035,
    fontWeight: 'bold',
    textAlign: 'center',
    width: winWidth * 0.6,
    maxWidth: winWidth * 0.6
  },
  button: {
    alignItems: 'center',
    marginRight: winWidth * 0.025
  },
  buttonsHolder: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    marginRight: winWidth * 0.02
  }
})
