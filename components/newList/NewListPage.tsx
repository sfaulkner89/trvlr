import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../types/colors'
import { Member } from '../../types/Member'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import { List } from '../../types/List'
import { Entypo } from '@expo/vector-icons'
import createList from '../../handlers/api/createList'
import { MutationResult, QueryResult, useMutation } from '@apollo/client'
import { CREATELIST } from '../../handlers/gql/lists/createList'
import { PlaceDetails } from 'types/PlaceDetails'
import { useAppSelector } from '../../redux/hooks'
import placeShim from '../../assets/tools/placeShim'

type Props = {
  colors: Colors
  currentUser: Member
  setNewList: (active: boolean) => void
  setSelectedList: (list: List) => void
  locale?: string
}

export default function NewListPage ({
  colors,
  currentUser,
  setNewList,
  setSelectedList,
  locale
}: Props) {
  const month = new Date().toLocaleString('default', { month: 'long' })
  const year = new Date().toLocaleString('default', { year: 'numeric' })

  const selectedPlace: PlaceDetails = useAppSelector(
    state => state.results.selectedPlace
  )

  const defaultListName = selectedPlace?.location.area
    ? `${selectedPlace.location.area} List ${year}`
    : `${month} ${year} List`

  const [listName, setListName] = useState<string>(defaultListName)

  const [newList] = useMutation(CREATELIST)

  const user = useAppSelector(state => state.user)
  const createHandler = async () => {
    const createdList = await createList(user, listName, selectedPlace, newList)
    setNewList(false)
    const cleanedPlaces = placeShim(createdList.places)
    setSelectedList({
      displayName: listName,
      photo: undefined,
      location: undefined, // get Coordinates of city if being created from a place.
      city: locale,
      country: undefined,
      dateCreated: new Date(),
      dateModified: new Date(),
      places: cleanedPlaces
    })
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ ...styles.container, backgroundColor: colors.midColor }}>
        <Pressable style={styles.exitHolder} onPress={() => setNewList(false)}>
          <Entypo
            name='cross'
            size={winWidth * 0.08}
            color={colors.lightColor}
          />
        </Pressable>
        <View style={{ ...styles.infoContainer }}>
          <Text style={{ ...styles.title, color: colors.lightColor }}>
            What's the name of your list?
          </Text>
          <View style={styles.inputHolder}>
            <View style={{ width: winWidth * 0.08 }} />
            <TextInput
              value={listName}
              onChangeText={setListName}
              style={{ ...styles.input, backgroundColor: colors.lightColor }}
              autoFocus
            />

            <Pressable
              style={styles.crossHolder}
              onPress={() => setListName('')}
            >
              <Entypo
                name='cross'
                size={winWidth * 0.08}
                color={colors.lightColor}
              />
            </Pressable>
          </View>

          <Pressable
            style={{ ...styles.button, backgroundColor: colors.selectedColor }}
            onPress={createHandler}
          >
            <Text style={{ ...styles.buttonText, color: colors.lightColor }}>
              Create
            </Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    width: winWidth,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    zIndex: 1
  },
  inputHolder: {
    flexDirection: 'row'
  },
  input: {
    width: winWidth * 0.8,
    height: winHeight * 0.05,
    fontSize: winWidth * 0.06,
    paddingLeft: winWidth * 0.02,
    borderRadius: winWidth * 0.02
  },
  title: {
    fontSize: winWidth * 0.06
  },
  infoContainer: {
    marginTop: winHeight * 0.27,
    height: winHeight * 0.2,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  button: {
    padding: winWidth * 0.04,
    borderRadius: winWidth * 0.05
  },
  buttonText: {
    fontSize: winWidth * 0.05
  },
  crossHolder: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  exitHolder: {
    marginTop: winHeight * 0.055,
    marginLeft: winWidth * 0.03
  }
})
