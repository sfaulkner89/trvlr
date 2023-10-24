import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import React from 'react'
import { PlaceDetails } from '../../types/PlaceDetails'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { List } from '../../types/List'
import { winHeight, winWidth } from '../../assets/variables/height-width'
import { Colors } from '../../types/colors'
import { setSelectedPlace } from '../../redux/slices/resultsSlice'
import { addToListHandler } from '../../handlers/api/addToListHandler'
import { useMutation } from '@apollo/client'
import { ADDPLACETOLIST } from '../../handlers/gql/lists/addPlaceToList'

type Props = {
  list: List
  colors: Colors
  setAddToList: (set: boolean) => void
}

export default function NoteInputScreen ({ list, colors, setAddToList }: Props) {
  const [placeAdder] = useMutation(ADDPLACETOLIST)

  const selectedPlace: PlaceDetails = useAppSelector(
    state => state.results.selectedPlace
  )
  const dispatch = useAppDispatch()

  const submitHandler = async () => {
    await addToListHandler(placeAdder, selectedPlace, list, setAddToList)
  }
  return (
    <View style={container}>
      <Text style={{ ...headerText, color: colors.lightColor }}>
        Add Note for {selectedPlace.name} in {list.displayName}
      </Text>
      <TextInput
        multiline
        autoFocus
        onChangeText={comment =>
          dispatch(setSelectedPlace({ ...selectedPlace, comment }))
        }
        style={{ ...noteInput, backgroundColor: 'white' }}
      />
      <Pressable
        style={{ ...submitButton, backgroundColor: colors.darkColor }}
        onPress={submitHandler}
      >
        <Text style={{ ...submitButtonText, color: colors.lightColor }}>
          Submit
        </Text>
      </Pressable>
    </View>
  )
}

const { container, noteInput, headerText, submitButton, submitButtonText } =
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    noteInput: {
      width: winWidth * 0.8,
      height: winHeight * 0.2,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 5,
      padding: 10,
      margin: 10
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center'
    },
    submitButton: {
      width: winWidth * 0.8,
      height: winHeight * 0.05,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
    submitButtonText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white'
    }
  })
