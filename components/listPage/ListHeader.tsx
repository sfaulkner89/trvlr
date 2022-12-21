import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../types/colors'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import { default as AnIcon } from 'react-native-vector-icons/AntDesign'
import { default as FaIcon } from 'react-native-vector-icons/FontAwesome5'
import { default as EnIcon } from 'react-native-vector-icons/Entypo'
import { default as FoIcon } from 'react-native-vector-icons/Fontisto'
import { Member } from '../../types/Member'
import { List } from '../../types/List'

type Props = {
  colors: Colors
  profile: List
  setSelectedList: (active: boolean) => void
  setSelection: (list: List) => void
}

const buttonSize = winWidth * 0.05

export default function ListHeader ({
  colors,
  profile,
  setSelectedList,
  setSelection
}: Props) {
  const [liked, setLiked] = useState(false)

  const likeHandler = () => {
    setLiked(!liked)
  }
  return (
    <View style={styles.container}>
      <View style={styles.buttonsHolder}>
        <Pressable style={styles.button} onPress={() => setSelectedList(false)}>
          <AnIcon name='left' size={buttonSize} color={colors.lightColor} />
        </Pressable>
      </View>
      <Text style={{ ...styles.displayName, color: colors.lightColor }}>
        {profile.displayName}
      </Text>
      <View style={styles.buttonsHolder}>
        <Pressable style={styles.button}>
          <AnIcon
            name={liked ? 'heart' : 'hearto'}
            size={buttonSize}
            color={colors.lightColor}
            onPress={likeHandler}
          />
        </Pressable>
        <Pressable style={styles.button}>
          <FoIcon name='save' size={buttonSize} color={colors.lightColor} />
        </Pressable>
        <Pressable style={styles.button}>
          <EnIcon
            name='dots-three-horizontal'
            size={buttonSize}
            color={colors.lightColor}
            onPress={() => setSelection(profile)}
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
