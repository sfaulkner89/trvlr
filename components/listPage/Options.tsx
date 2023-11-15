import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../types/colors'
import { BlurView } from 'expo-blur'
import { Option } from '../../types/Option'
import OptionHolder from './OptionHolder'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import { Place } from '../../types/Place'
import { Entypo } from '@expo/vector-icons'
import { Member } from '../../types/Member'
import { List } from '../../types/List'
import { PlaceDetails } from 'types/PlaceDetails'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  clearOptions,
  setNameChange,
  setOptionsType
} from '../../redux/slices/optionsSlice'
import { exit } from 'process'
import { list } from 'firebase/storage'
import listOptions from '../../assets/variables/listOptions'
import contactOptions from '../../assets/variables/contactOptions'
import NameChange from '../shared/NameChange'
import { useMutation } from '@apollo/client'
import { PUTCONTACT } from '../../handlers/gql/users/putContact'
import { setUser } from '../../redux/slices/userSlice'

type Props = {
  colors: Colors
  type?: string
  exitHandler?: () => void
}

export default function Options ({ colors, type = 'list' }: Props) {
  const optionsType = useAppSelector(state => state.options.optionsType)
  const optionsTarget = useAppSelector(state => state.options.optionsTarget)
  const nameChange = useAppSelector(state => state.options.nameChange)
  const user = useAppSelector<Member>(state => state.user)
  const dispatch = useAppDispatch()
  const [putContact] = useMutation<{ putContact: { id: string } }>(PUTCONTACT)

  let nameChangeSubmit = (name: string) => {}
  let optionsList
  let nameChangeMessage
  let defaultName

  switch (optionsType) {
    case 'list':
      optionsList = listOptions(colors)
    case 'contact':
      optionsList = contactOptions(colors, dispatch)
      nameChangeSubmit = (name: string) => {
        putContact({
          variables: {
            userId: user.id,
            contactIds: [optionsTarget.id],
            groupName: name
          }
        })
        const updatedContact = {
          ...user.contacts.find(c => c.id === optionsTarget.id)
        }
        updatedContact.group = name
        dispatch(
          setUser({
            ...user,
            contacts: [
              ...user.contacts.filter(c => c.id !== optionsTarget.id),
              updatedContact
            ]
          })
        )
        dispatch(clearOptions())
      }
      nameChangeMessage = 'Which group would you like to add this contact to?'
      defaultName = user.contactIds.find(c => c.id === optionsTarget.id)?.group
  }

  if (nameChange) {
    return (
      <NameChange
        submitHandler={nameChangeSubmit}
        exitHandler={() => dispatch(setNameChange(null))}
        defaultValue={defaultName}
        nameChangeMessage={nameChangeMessage}
      />
    )
  }

  return (
    <View style={{ ...styles.background, backgroundColor: colors.darkColor }}>
      <View style={{ height: winHeight * 0.05 }}></View>
      <View style={{ ...styles.header, backgroundColor: colors.darkColor }}>
        <Pressable onPress={() => dispatch(clearOptions())}>
          <Entypo
            name='cross'
            size={winWidth * 0.08}
            color={colors.lightColor}
            style={styles.cross}
          />
        </Pressable>
        <Text style={{ ...styles.name, color: colors.lightColor }}>
          {optionsTarget.username}
        </Text>
        <View style={{ width: winWidth * 0.2 }}></View>
      </View>
      <ScrollView
        style={{ ...styles.container, backgroundColor: colors.darkColor }}
      >
        {optionsList.map((option, i) => {
          return (
            <OptionHolder option={option} colors={colors} key={i} type={type} />
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    position: 'relative',
    top: 0,
    left: 0,
    height: winHeight,
    width: winWidth,
    zIndex: 5,
    opacity: 1
  },
  header: {
    height: winHeight * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  name: {
    fontSize: winWidth * 0.04,
    fontWeight: 'bold',
    width: winWidth * 0.55,
    textAlign: 'center'
  },
  cross: {
    width: winWidth * 0.2
  },
  container: {
    position: 'relative',
    flex: 1
  }
})
