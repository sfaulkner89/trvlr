import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../types/colors'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { Member } from '../../types/Member'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { clearContact } from '../../redux/slices/contactSlice'
import { hideChatPage } from '../../redux/slices/messageSlice'

type Props = {
  colors: Colors
  profile: Member
}

const buttonSize = winWidth * 0.05

export default function ChatHeader ({ colors, profile }: Props) {
  const contact = useAppSelector(store => store.contact[profile.id])
  const dispatch = useAppDispatch()

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => dispatch(hideChatPage())}>
        <AntDesign name='left' size={buttonSize} color={colors.lightColor} />
      </Pressable>
      <Text style={{ ...styles.handle, color: colors.lightColor }}>
        {contact?.username}
      </Text>
      <Pressable style={styles.button}>
        <Entypo
          name='dots-three-horizontal'
          size={buttonSize}
          color={colors.lightColor}
        />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: winHeight * 0.09,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: winHeight * 0.02,
    flexDirection: 'row'
  },
  handle: {
    marginTop: winHeight * 0.01,
    fontSize: winWidth * 0.035,
    fontWeight: 'bold',
    width: winWidth * 0.76,
    textAlign: 'center'
  },
  button: {
    width: winWidth * 0.12,
    alignItems: 'center'
  }
})
