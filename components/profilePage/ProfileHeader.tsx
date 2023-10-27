import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../types/colors'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import { AntDesign, Entypo } from '@expo/vector-icons'

import { Member } from '../../types/Member'
import { useAppDispatch } from '../../redux/hooks'
import { setContact } from '../../redux/slices/contactSlice'
import { showOptions } from '../../redux/slices/optionsSlice'

type Props = {
  colors: Colors
  profile: Member
  isCurrentUser: boolean
}

const buttonSize = winWidth * 0.05

export default function ProfileHeader ({
  colors,
  profile,
  isCurrentUser
}: Props) {
  const dispatch = useAppDispatch()

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.buttonHolder,
          justifyContent: isCurrentUser ? 'flex-end' : 'center'
        }}
      >
        {!isCurrentUser && (
          <Pressable
            style={styles.button}
            onPress={() => dispatch(setContact(null))}
          >
            <AntDesign
              name='left'
              size={buttonSize}
              color={colors.lightColor}
            />
          </Pressable>
        )}
      </View>

      <Text style={{ ...styles.displayName, color: colors.lightColor }}>
        {profile.displayName}
      </Text>
      <View
        style={{
          ...styles.buttonHolder,
          justifyContent: isCurrentUser ? 'flex-end' : 'center'
        }}
      >
        <Pressable
          style={{
            ...styles.button,
            alignItems: isCurrentUser ? 'flex-end' : 'center'
          }}
          onPress={() => dispatch(showOptions())}
        >
          <Entypo
            name='dots-three-horizontal'
            size={buttonSize}
            color={colors.lightColor}
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
  buttonHolder: {
    flexDirection: 'row',
    flex: 1,
    marginRight: winWidth * 0.02
  }
})
